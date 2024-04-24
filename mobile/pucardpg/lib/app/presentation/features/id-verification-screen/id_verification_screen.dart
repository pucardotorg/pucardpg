
import 'dart:io';

import 'package:digit_components/digit_components.dart';
import 'package:digit_components/widgets/atoms/digit_toaster.dart';
import 'package:digit_components/widgets/digit_card.dart';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter/widgets.dart';
import 'package:pucardpg/app/domain/entities/litigant_model.dart';
import 'package:pucardpg/app/presentation/widgets/back_button.dart';
import 'package:pucardpg/app/presentation/widgets/help_button.dart';
import 'package:pucardpg/config/mixin/app_mixin.dart';

class IdVerificationScreen extends StatefulWidget with AppMixin{

  UserModel userModel = UserModel();

  IdVerificationScreen({super.key, required this.userModel});

  @override
  IdVerificationScreenState createState() => IdVerificationScreenState();

}

class IdVerificationScreenState extends State<IdVerificationScreen> {

  bool fileSizeExceeded = false;
  late String mobile;
  String adhaarNumber = "", typeOfId = "";
  TextEditingController searchController = TextEditingController();

  String? fileName;
  FilePickerResult? result;
  PlatformFile? pickedFile;
  File? fileToDisplay;

  @override
  void initState() {
    super.initState();
  }

  void pickFile() async {
    try {
      result = await FilePicker.platform.pickFiles(
          type: FileType.custom,
          allowedExtensions: ['pdf', 'jpg', 'png'],
          allowMultiple: false
      );
      if (result != null) {
        final file = File(result!.files.single.path!);
        final fileSize = await file.length(); // Get file size in bytes
        const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes
        if (fileSize <= maxFileSize) {
          fileName = result!.files.single.name;
          pickedFile = result!.files.single;
          setState(() {
            fileToDisplay = file;
            fileSizeExceeded = false;
          });
        } else {
          setState(() {
            fileSizeExceeded = true;
          });
        }
      }
    } catch(e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return WillPopScope(
      onWillPop: _onBackPressed,
      child: Scaffold(
          appBar: AppBar(
            title: const Text(""),
            centerTitle: true,
            actions: [
              IconButton(onPressed: () {}, icon: const Icon(Icons.notifications))
            ],
            leading: IconButton(
              onPressed: () {},
              icon: const Icon(Icons.menu),
            ),
          ),
          body: Column(
            children: [
              Expanded(
                child: SingleChildScrollView(
                  child: Column(
                    children: [
                      const SizedBox(height: 10,),
                      DigitCard(
                        padding: const EdgeInsets.all(20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text("Registration", style: widget.theme.text20W400Rob()?.apply(fontStyle: FontStyle.italic),),
                            const SizedBox(height: 20,),
                            Text("ID Verification", style: widget.theme.text32W700RobCon()?.apply(),),
                            const SizedBox(height: 20,),
                            Text("Please provide details for registration", style: widget.theme.text16W400Rob(),),
                            const SizedBox(height: 20,),
                            DigitTextField(
                              label: 'Enter aadhar number',
                              maxLength: 12,
                              pattern: r'^([0-9]){12}$',
                              textInputType: TextInputType.number,
                              onChange: (val) { widget.userModel.identifierId = val; },
                              inputFormatter: [
                                FilteringTextInputFormatter.allow(RegExp(r'[0-9]')),
                              ],
                            ),
                            const SizedBox(height: 20,),
                            Center(child: Text("(or)", style: widget.theme.text20W400Rob(),)),
                            const SizedBox(height: 20,),
                            DigitTextField(
                              label: 'Type of ID',
                              onChange: (val) { typeOfId = val; },
                            ),
                            const SizedBox(height: 20,),
                            Row(
                              crossAxisAlignment: CrossAxisAlignment.end,
                              children: [
                                Expanded(
                                  child: DigitTextField(
                                    label: 'Upload ID proof',
                                    controller: TextEditingController(text: fileName ?? ''),
                                    readOnly: true,
                                    hintText: 'No File selected',
                                  ),
                                ),
                                const SizedBox(width: 10,),
                                SizedBox(
                                  height: 44,
                                  width: 120,
                                  child: DigitOutLineButton(
                                    label: 'Upload',
                                    onPressed: (){
                                      pickFile();
                                    },
                                  ),
                                ),
                              ],
                            ),
                            const SizedBox(height: 8,),
                            if (fileSizeExceeded) // Show text line in red if file size exceeded
                             const Text(
                                 'File Size Limit Exceeded. Upload a file below 5MB.',
                                 style: TextStyle(color: Colors.red),
                             ),
                          ],
                        ),
                      ),
                      const DigitInfoCard(title: "Info", description: "Using Aadhar number for Verification will provide a Verified status against your profile."),
                      // Expanded(child: Container(),),
                    ],
                  ),
                ),
              ),
              DigitElevatedButton(
                  onPressed: () {
                    FocusScope.of(context).unfocus();
                    if(widget.userModel.identifierId!.isEmpty && typeOfId.isEmpty){
                      DigitToast.show(context,
                        options: DigitToastOptions(
                          "Either adhaar number or ID proof is mandatory.",
                          true,
                          widget.theme.theme(),
                        ),
                      );
                      return;
                    }
                    if(typeOfId.isNotEmpty && (fileName == null || fileName!.isEmpty)) {
                      DigitToast.show(context,
                        options: DigitToastOptions(
                          "Please upload ID proof",
                          true,
                          widget.theme.theme(),
                        ),
                      );
                      return;
                    }
                    if (widget.userModel.identifierId!.length != 12) {
                      DigitToast.show(context,
                        options: DigitToastOptions(
                          "Enter a valid aadhar number",
                          true,
                          widget.theme.theme(),
                        ),
                      );
                      return;
                    }
                    Navigator.pushNamed(context, '/IdOtpScreen', arguments: widget.userModel);
                  },
                  child: Text('Next',  style: widget.theme.text20W700()?.apply(color: Colors.white, ),)
              ),
            ],
          )
      ),
    );

  }

  Future<bool> _onBackPressed() async {
    return await DigitDialog.show(
        context,
        options: DigitDialogOptions(
            titleIcon: const Icon(
              Icons.warning,
              color: Colors.red,
            ),
            titleText: 'Warning',
            contentText:
            'Are you sure you want to exit the application?',
            primaryAction: DigitDialogActions(
                label: 'Yes',
                action: (BuildContext context) =>
                    SystemChannels.platform.invokeMethod('SystemNavigator.pop')
            ),
            secondaryAction: DigitDialogActions(
                label: 'No',
                action: (BuildContext context) =>
                    Navigator.of(context).pop(false)
            ))
    ) ?? false;
  }

}