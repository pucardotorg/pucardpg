

import 'dart:developer';
import 'dart:io';

import 'package:dio/dio.dart' as dio;
import 'package:get/get_connect/http/src/multipart/multipart_file.dart';

import 'package:pucardpg/app/data/data_sources/api_service.dart';
import 'package:pucardpg/app/data/models/advocate-clerk-registration-model/advocate_clerk_registration_model.dart';
import 'package:pucardpg/app/data/models/advocate-registration-model/advocate_registration_model.dart';
import 'package:pucardpg/app/data/models/auth-response/auth_response.dart';
import 'package:pucardpg/app/data/models/citizen-registration-request/citizen_registration_request.dart';
import 'package:pucardpg/app/data/models/file-upload-response-model/file_upload_response_model.dart';
import 'package:pucardpg/app/data/models/individual-search/individual_search_model.dart';
import 'package:pucardpg/app/data/models/litigant-registration-model/litigant_registration_model.dart';
import 'package:pucardpg/app/data/models/otp-models/otp_model.dart';
import 'package:pucardpg/app/domain/repository/registration_login_repository.dart';
import 'package:pucardpg/core/constant/constants.dart';
import 'package:pucardpg/core/resources/data_state.dart';
import 'package:retrofit/dio.dart';

class RegistrationLoginRepositoryImpl implements RegistrationLoginRepository {

  final ApiService _apiService;

  RegistrationLoginRepositoryImpl(this._apiService);

  @override
  Future<DataState<OtpResponse>> requestOtp(OtpRequest otpRequest) async {
    // TODO: implement requestOtp
    try {
      final httpResponse = await _apiService.requestOtp(tenantId, timeStamp, otpRequest);

      if (httpResponse.response.statusCode == HttpStatus.ok || httpResponse.response.statusCode == HttpStatus.created || httpResponse.response.statusCode == HttpStatus.accepted) {
        return DataSuccess(httpResponse.data);
      } else {
        return DataFailed(
            dio.DioError(
                error: httpResponse.data.error?.message,
                response: httpResponse.response,
                type: dio.DioErrorType.response,
                requestOptions: httpResponse.response.requestOptions
            )
        );
      }
    } on dio.DioError catch(e){
      // if(e.response?.statusCode == 400){
      //   return DataFailed(
      //       dio.DioError(
      //           error: e.response?.data.error?.message,
      //           response: e.response,
      //           type: dio.DioErrorType.response,
      //           requestOptions: e.requestOptions
      //       )
      //   );
      // }
      return DataFailed(e);
    }

  }

  @override
  Future<DataState<AuthResponse>> createCitizen(CitizenRegistrationRequest citizenRegistrationRequest) async {
    // TODO: implement createCitizen
    try {
      final httpResponse = await _apiService.createCitizen(citizenRegistrationRequest);

      if (httpResponse.response.statusCode == HttpStatus.ok || httpResponse.response.statusCode == HttpStatus.created || httpResponse.response.statusCode == HttpStatus.accepted) {
        return DataSuccess(httpResponse.data);
      } else {
        return DataFailed(
            dio.DioError(
                error: "",
                response: httpResponse.response,
                type: dio.DioErrorType.response,
                requestOptions: httpResponse.response.requestOptions
            )
        );
      }
    } on dio.DioError catch(e){
      return DataFailed(e);
    }

  }

  @override
  Future<DataState<AuthResponse>> getAuthResponse(String username, String password) async {
    // TODO: implement getAuthResponse
    try {
      final httpResponse = await _apiService.getAuthResponse('Basic ZWdvdi11c2VyLWNsaWVudDo=', username, password);

      if (httpResponse.response.statusCode == HttpStatus.ok || httpResponse.response.statusCode == HttpStatus.created || httpResponse.response.statusCode == HttpStatus.accepted) {
        return DataSuccess(httpResponse.data);
      } else {
        return DataFailed(
            dio.DioError(
                error: "",
                response: httpResponse.response,
                type: dio.DioErrorType.response,
                requestOptions: httpResponse.response.requestOptions
            )
        );
      }
    } on dio.DioError catch(e){
      return DataFailed(e);
    }

  }

  @override
  Future<DataState<AdvocateRegistrationResponse>> registerAdvocate(AdvocateRegistrationRequest advocateRegistrationRequest) async {
    try {
      final httpResponse = await _apiService.registerAdvocate('application/json', advocateRegistrationRequest);

      if (httpResponse.response.statusCode == HttpStatus.ok || httpResponse.response.statusCode == HttpStatus.created || httpResponse.response.statusCode == HttpStatus.accepted) {
        return DataSuccess(httpResponse.data);
      } else {
        return DataFailed(
            dio.DioError(
                error: "",
                response: httpResponse.response,
                type: dio.DioErrorType.response,
                requestOptions: httpResponse.response.requestOptions
            )
        );
      }
    } on dio.DioError catch(e){
      return DataFailed(e);
    }
  }

  @override
  Future<DataState<AdvocateClerkRegistrationResponse>> registerAdvocateClerk(AdvocateClerkRegistrationRequest advocateClerkRegistrationRequest) async {
    try {
      final httpResponse = await _apiService.registerAdvocateClerk('application/json', advocateClerkRegistrationRequest);

      if (httpResponse.response.statusCode == HttpStatus.ok || httpResponse.response.statusCode == HttpStatus.created || httpResponse.response.statusCode == HttpStatus.accepted) {
        return DataSuccess(httpResponse.data);
      } else {
        return DataFailed(
            dio.DioError(
                error: "",
                response: httpResponse.response,
                type: dio.DioErrorType.response,
                requestOptions: httpResponse.response.requestOptions
            )
        );
      }
    } on dio.DioError catch(e){
      return DataFailed(e);
    }
  }

  @override
  Future<DataState<String>> getFileStore(dio.MultipartFile multipartFile, File file) async {
    // try {
    // final httpResponse = await _apiService.getFileStore(module, tenantId);
    dio.FormData formData = dio.FormData.fromMap({
      'file': multipartFile,
      'tenantId': tenantId,
      'module': module
    });

    inspect(formData);

    final response = await dio.Dio().post(
        '$apiBaseURL/filestore/v1/files',
        data: formData,
        options: dio.Options(headers: {
          'Content-Type': 'multipart/form-data'
        },)
    );

    // if (httpResponse.response.statusCode == HttpStatus.ok || httpResponse.response.statusCode == HttpStatus.created) {
    return DataSuccess("");
    //   } else {
    //     return DataFailed(
    //         dio.DioError(
    //             error: "",
    //             response: httpResponse.response,
    //             type: dio.DioErrorType.response,
    //             requestOptions: httpResponse.response.requestOptions
    //         )
    //     );
    //   }
    // } on dio.DioError catch(e){
    //   return DataFailed(e);
    // }
  }

  @override
  Future<DataState<IndividualSearchResponse>> searchIndividual(IndividualSearchRequest individualSearchRequest) async {
    try {
      final httpResponse = await _apiService.searchIndividual(limit, offset, tenantId, individualSearchRequest);

      if (httpResponse.response.statusCode == HttpStatus.ok || httpResponse.response.statusCode == HttpStatus.created || httpResponse.response.statusCode == HttpStatus.accepted) {
        return DataSuccess(httpResponse.data);
      } else {
        return DataFailed(
            dio.DioError(
                error: "",
                response: httpResponse.response,
                type: dio.DioErrorType.response,
                requestOptions: httpResponse.response.requestOptions
            )
        );
      }
    } on dio.DioError catch(e){
      return DataFailed(e);
    }
  }

  @override
  Future<DataState<LitigantResponseModel>> registerLitigant(LitigantNetworkModel litigantNetworkModel) async {
    try {
      final httpResponse = await _apiService.registerLitigant(litigantNetworkModel);

      if (httpResponse.response.statusCode == HttpStatus.ok || httpResponse.response.statusCode == HttpStatus.created || httpResponse.response.statusCode == HttpStatus.accepted) {
        return DataSuccess(httpResponse.data);
      } else {
        return DataFailed(
            dio.DioError(
                error: "",
                response: httpResponse.response,
                type: dio.DioErrorType.response,
                requestOptions: httpResponse.response.requestOptions
            )
        );
      }
    } on dio.DioError catch(e){
      return DataFailed(e);
    }
  }

  Future<DataState<FileUploadResponseModel>> uploadFile(File file) async{
    try {
      return DataSuccess(FileUploadResponseModel());
      // final httpResponse = await _apiService.uploadFile("pg", "DRISTI", file);
      //
      // if (httpResponse.response.statusCode == HttpStatus.ok || httpResponse.response.statusCode == HttpStatus.created || httpResponse.response.statusCode == HttpStatus.accepted) {
      //   return DataSuccess(httpResponse.data);
      // }
      // else {
      //   return DataFailed(
      //       dio.DioError(
      //           error: "",
      //           response: httpResponse.response,
      //           type: dio.DioErrorType.response,
      //           requestOptions: httpResponse.response.requestOptions
      //       )
      //   );
      // }
    } on dio.DioError catch(e){
      return DataFailed(e);
    }
  }


}