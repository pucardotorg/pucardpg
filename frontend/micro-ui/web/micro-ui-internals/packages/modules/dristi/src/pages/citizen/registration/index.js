import React, { useState } from "react";
import { newConfig } from "./config";
import { FormComposerV2, Header, Toast } from "@egovernments/digit-ui-react-components";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

const Registration = () => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const history = useHistory();
  const [showErrorToast, setShowErrorToast] = useState(false);

  const validateFormData = (data) => {
    let isValid = true;
    newConfig.forEach((curr) => {
      if (!isValid) return;
      if (!(curr.body[0].key in data) || !data[curr.body[0].key]) {
        isValid = false;
      }
      curr.body[0].populators.inputs.forEach((input) => {
        if (!isValid) return;
        if (Array.isArray(input.name)) return;
        if (
          input.isDependentOn &&
          data[curr.body[0].key][input.isDependentOn] &&
          !Boolean(data[curr.body[0].key][input.isDependentOn][input.dependentKey])
        ) {
          return;
        }
        if (Array.isArray(data[curr.body[0].key][input.name]) && data[curr.body[0].key][input.name].length === 0) {
          isValid = false;
        }
        if (input?.isMandatory && !(input.name in data[curr.body[0].key])) {
          isValid = false;
        }
      });
    });
    return isValid;
  };

  const onSubmit = (data) => {
    console.log("data", data);
    if (!validateFormData(data)) {
      setShowErrorToast(!validateFormData(data));
      return;
    }
    const uploadedDocument = Digit?.SessionStorage?.get("UploadedDocument");
    const aadharNumber = Digit?.SessionStorage?.get("aadharNumber");
    const identifierId = uploadedDocument ? uploadedDocument?.filedata?.files?.[0]?.fileStoreId : aadharNumber;
    const identifierType = uploadedDocument ? uploadedDocument?.IdType?.code : "ADHAAR";
    debugger;
    let Individual = {
      Individual: {
        tenantId: tenantId,
        name: {
          givenName: data?.userDetails?.firstName,
          familyName: data?.userDetails?.lastName,
          otherNames: data?.userDetails?.middleName,
        },
        userDetails: {
          username: Digit.UserService.getUser()?.info?.userName,
          roles: [
            {
              code: "USER_REGISTER",
              name: "USER_REGISTER",
              description: "USER_REGISTER",
              tenantId: tenantId,
            },
            {
              code: "CITIZEN",
              name: "Citizen",
              tenantId: tenantId,
            },
          ],
          type: Digit.UserService.getUser()?.info?.type,
        },
        userUuid: Digit.UserService.getUser()?.info?.uuid,
        userId: Digit.UserService.getUser()?.info?.id,
        mobileNumber: Digit.UserService.getUser()?.info?.mobileNumber,
        address: [
          {
            tenantId: tenantId,
            type: "PERMANENT",
            doorNo: data?.addressDetails?.doorNo,
            latitude: data?.addressDetails?.coordinates?.latitude,
            longitude: data?.addressDetails?.coordinates?.longitude,
            city: data?.addressDetails?.city,
            pincode: data?.addressDetails?.pincode,
            district: data?.addressDetails?.district,
          },
        ],
        identifiers: [
          {
            identifierType: identifierType,
            identifierId: identifierId,
          },
        ],
        isSystemUser: true,
        skills: [],
        additionalFields: {
          fields: [{ key: "userType", value: data?.clientDetails?.selectUserType?.code }],
        },
        clientAuditDetails: {},
        auditDetails: {},
      },
    };
    Digit.DRISTIService.postIndividualService(Individual, tenantId)
      .then(() => {
        if (data?.clientDetails?.selectUserType?.serviceName) {
          const data = {
            advocates: [
              {
                tenantId: tenantId,
                applicationNumber: "string",
                barRegistrationNumber: "string",
                advocateType: "PROSECUTOR, PUBLIC DEFENDER",
                organisationID: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                individualId: "string",
                isActive: true,
                workflow: {
                  action: "string",
                  comment: "string",
                  assignees: ["string"],
                },
                documents: [
                  {
                    id: "string",
                    documentType: "string",
                    fileStore: "string",
                    documentUid: "string",
                    additionalDetails: {},
                  },
                ],
                additionalDetails: {},
              },
            ],
          };
          Digit.DRISTIService.complainantService(Individual, tenantId);
        } else history.push(`/digit-ui/citizen/dristi/home/response`, "success");
      })
      .catch(() => {
        history.push(`/digit-ui/citizen/dristi/home/response`, "error");
      });
  };

  const closeToast = () => {
    setShowErrorToast(false);
  };

  return (
    <div className="employee-card-wrapper">
      <div className="header-content">
        <Header>{t("CS_COMMON_REGISTRATION_DETAIL")}</Header>
      </div>
      <FormComposerV2
        label={t("CS_COMMON_SUBMIT")}
        config={newConfig.map((config) => {
          return {
            ...config,
            body: config.body.filter((a) => !a.hideInEmployee),
          };
        })}
        onSubmit={(props) => {
          onSubmit(props);
        }}
        cardStyle={{ minWidth: "100%" }}
      />
      {showErrorToast && <Toast error={true} label={t("ES_COMMON_PLEASE_ENTER_ALL_MANDATORY_FIELDS")} isDleteBtn={true} onClose={closeToast} />}
    </div>
  );
};

export default Registration;