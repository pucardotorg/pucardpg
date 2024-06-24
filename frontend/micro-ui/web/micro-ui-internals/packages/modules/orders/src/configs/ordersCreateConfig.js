export const configs = [
  {
    body: [
      {
        isMandatory: true,
        key: "orderType",
        type: "dropdown",
        label: "ORDER_TYPE",
        disable: false,
        populators: {
          name: "orderType",
          optionsKey: "name",
          error: "required ",
          mdmsConfig: {
            moduleName: "Order",
            masterName: "OrderType",
            localePrefix: "ORDER_TYPE",
          },
        },
      },
      {
        isMandatory: true,
        key: "documentType",
        type: "dropdown",
        label: "DOCUMENT_TYPE",
        disable: false,
        populators: {
          name: "DocumentType",
          optionsKey: "name",
          error: "required ",
          mdmsConfig: {
            moduleName: "Order",
            masterName: "DocumentType",
            localePrefix: "",
          },
        },
      },
      {
        isMandatory: true,
        key: "partyToMakeSubmission",
        type: "dropdown",
        label: "PARTIES_TO_MAKE_SUBMISSION",
        disable: false,
        populators: {
          name: "genders",
          optionsKey: "name",
          error: "required ",
          mdmsConfig: {
            moduleName: "Order",
            masterName: "SubmissionName",
            localePrefix: "",
          },
        },
      },
      {
        inline: true,
        label: "DEADLINE_FOR_SUBMISSION",
        isMandatory: false,
        key: "deadlineForSubmission",
        type: "date",
        disable: false,
        populators: {
          name: "submissionDeadlineDate",
          error: "Required",
          mdmsConfig: {
            moduleName: "Order",
            masterName: "DeadlineForSubmission",
            localePrefix: "",
          },
        },
      },
    ],
  },
  {
    body: [
      {
        type: "component",
        component: "SelectCustomTextArea",
        key: "orderAdditionalNotes",
        populators: {
          inputs: [
            {
              textAreaSubHeader: "CS_ORDER_ADDITIONAL_NOTES",
              type: "TextAreaComponent",
              isOptional: true,
            },
          ],
          mdmsConfig: {
            moduleName: "Order",
            masterName: "", // TO DO: ADD CONFIG IN MDMS
            localePrefix: "",
          },
        },
      },
    ],
  },
  {
    body: [
      {
        type: "radio",
        key: "isResponseRequired",
        label: "IS_RESPONSE_REQUIRED",
        isMandatory: true,
        populators: {
          label: "IS_RESPONSE_REQUIRED",
          type: "radioButton",
          optionsKey: "name",
          error: "CORE_REQUIRED_FIELD_ERROR",
          required: false,
          isMandatory: true,
          // isDependent: true,
          options: [
            {
              code: "YES",
              name: "YES",
              showForm: true,
              isEnabled: true,
            },
            {
              code: "NO",
              name: "NO",
              showForm: false,
              // isVerified: true,
              isEnabled: true,
            },
          ],
        },
      },
    ],
  },
  {
    body: [
      {
        isMandatory: true,
        key: "partiesToRespond",
        type: "dropdown",
        label: "PARTIES_TO_RESPOND",
        disable: false,
        populators: {
          name: "genders",
          optionsKey: "name",
          error: "required ",
          mdmsConfig: {
            moduleName: "Order",
            masterName: "PartyToRespond",
            localePrefix: "",
          },
        },
      },
      {
        inline: true,
        label: "DEADLINE_TO_RESPOND",
        isMandatory: false,
        key: "deadlineToRespond",
        type: "date",
        disable: false,
        populators: {
          name: "respondDeadlineDate",
          error: "Required",
          mdmsConfig: {
            moduleName: "Order",
            masterName: "", // TO DO: ADD MDMS CONFIG
            localePrefix: "",
          },
        },
      },
    ],
  },
];

export const configData = {
  "SECTION_202_CRPC": configsOrderSection202CRPC,
  "DOCUMENT_SUBMISSION": configsOrderMandatorySubmissions,
  "EXTENSION_OF_DOCUMENT_SUBMISSION_DATE": configsOrderSubmissionExtension,
  "TRANSFER_TO_ADR": configsOrderTranferToADR,
  "NEXT_HEARING": configsScheduleHearingDate,
  "ORDER_TYPE_RESCHEDULE_OF_HEARING_DATE": configsRescheduleHearingDate,
  "VOLUNTARY_SUBMISSION_STATUS": configsVoluntarySubmissionStatus,
  "CASE_TRANSFER": configsCaseTransfer,
  "CASE_SETTLEMENT": configsCaseSettlement,
  "SUMMONS": configsIssueSummons,
  "BAIL": configsBail
}

export const configsOrderSection202CRPC = [
  {
    head: "SECTION_202_CRPC",
    body: [
      {
        inline: true,
        label: "REF_APPLICATION_ID",
        isMandatory: false,
        key: "refApplicationId",
        type: "text",
        populators: { name: "refApplicationId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: false,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: false,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_DESIGNATION",
        isMandatory: false,
        key: "judgeDesignation",
        type: "text",
        populators: { name: "judgeDesignation", hideInForm: true },
      },
      {
        inline: true,
        label: "DISTRICT",
        isMandatory: false,
        key: "district",
        type: "text",
        populators: { name: "district", hideInForm: true },
      },
      {
        inline: true,
        label: "STATE",
        isMandatory: false,
        key: "state",
        type: "text",
        populators: { name: "state", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: false,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_YEAR",
        isMandatory: false,
        key: "filingYear",
        type: "text",
        populators: { name: "filingYear", hideInForm: true },
      },
      {
        inline: true,
        label: "APPLICATION_FILLED_BY",
        isMandatory: false,
        key: "applicationFilledBy",
        type: "radio",
        populators: {
          name: "applicationFilledBy",
          optionsKey: "name",
          error: "Error!",
          required: false,
          options: [
            {
              code: "COMPLAINANT_1",
              name: "COMPLAINANT_1",
            },
            {
              code: "COMPLAINANT_2",
              name: "COMPLAINANT_2",
            },
            {
              code: "COMPLAINANT_3",
              name: "COMPLAINANT_3",
            },
          ],
        },
      },
      {
        inline: true,
        label: "DETAILS_SEEKED_OF",
        isMandatory: false,
        key: "detailsSeekedOf",
        type: "radio",
        populators: {
          name: "detailsSeekedOf",
          optionsKey: "name",
          error: "Error!",
          required: false,
          options: [
            {
              code: "RESPONDANT_1",
              name: "RESPONDANT_1",
            },
            {
              code: "RESPONDANT_2",
              name: "RESPONDANT_2",
            },
            {
              code: "RESPONDANT_3",
              name: "RESPONDANT_3",
            },
          ],
        },
      },
      {
        inline: true,
        label: "LAW_SECTIONS",
        isMandatory: false,
        key: "lawSections",
        type: "textarea",
        populators: { name: "lawSections" },
      },
      {
        inline: true,
        label: "RESPONSE_REQUIRED_BY",
        isMandatory: false,
        key: "responseRequiredBy",
        type: "date",
        populators: { name: "responseRequiredBy" },
      },
      {
        inline: true,
        label: "DATE_OF_ORDER",
        isMandatory: false,
        key: "dateOfOrder",
        type: "date",
        populators: { name: "dateOfOrder", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_NAME",
        isMandatory: false,
        key: "judgeName",
        type: "text",
        populators: { name: "judgeName", hideInForm: true },
      },
    ]
  }
];

export const configsOrderMandatorySubmissions = [
  {
    head: "DOCUMENT_SUBMISSION",
    body: [
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: false,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: false,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: false,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: false,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_NAME",
        isMandatory: false,
        key: "judgeName",
        type: "text",
        populators: { name: "judgeName", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_ORDER",
        isMandatory: false,
        key: "dateOfOrder",
        type: "date",
        populators: { name: "dateOfOrder", hideInForm: true },
      },
      {
        inline: true,
        label: "DOCUMENT_TYPE",
        isMandatory: false,
        key: "documentType",
        type: "dropdown",
        populators: {
          name: "documentType",
          optionsKey: "name",
          error: "Error!",
          required: false,
          options: [
            {
              code: "DOCUMENT_TYPE_1",
              name: "DOCUMENT_TYPE_1",
            },
            {
              code: "DOCUMENT_TYPE_2",
              name: "DOCUMENT_TYPE_2",
            },
            {
              code: "DOCUMENT_TYPE_3",
              name: "DOCUMENT_TYPE_3",
            },
          ],
        },
      },
      {
        inline: true,
        label: "DOCUMENT_NAME",
        isMandatory: false,
        key: "documentName",
        type: "text",
        populators: { name: "documentName" },
      },
      {
        inline: true,
        label: "SUBMISSION_PARTY",
        isMandatory: false,
        key: "submissionParty",
        type: "multiselectdropdown",
        populators: {
          name: "submissionParty",
          optionsKey: "name",
          error: "Error!",
          required: false,
          options: [
            {
              code: "PARTY_1",
              name: "PARTY_1",
            },
            {
              code: "PARTY_2",
              name: "PARTY_2",
            },
            {
              code: "PARTY_3",
              name: "PARTY_3",
            },
          ],
        },
      },
      {
        inline: true,
        label: "SUBMISSION_DEADLINE",
        isMandatory: false,
        key: "submissionDeadline",
        type: "date",
        populators: { name: "submissionDeadline" },
      },
      {
        inline: true,
        label: "ADDITIONAL_COMMENTS",
        isMandatory: false,
        key: "additionalComments",
        type: "textarea",
        populators: { name: "additionalComments" },
      },
      {
        inline: true,
        label: "IS_RESPONSE_REQUIRED",
        isMandatory: false,
        key: "isResponseRequired",
        type: "checkbox",
        populators: { name: "isResponseRequired", title: "" },
      },
      {
        inline: true,
        label: "RESPONDING_PARTY",
        isMandatory: false,
        key: "respondingParty",
        type: "multiselectdropdown",
        populators: {
          name: "respondingParty",
          optionsKey: "name",
          error: "Error!",
          required: false,
          options: [
            {
              code: "PARTY_1",
              name: "PARTY_1",
            },
            {
              code: "PARTY_2",
              name: "PARTY_2",
            },
            {
              code: "PARTY_3",
              name: "PARTY_3",
            },
          ],
        },
      },
      {
        inline: true,
        label: "RESPONSE_DEADLINE",
        isMandatory: false,
        key: "responseDeadline",
        type: "date",
        populators: { name: "responseDeadline" },
      },
      {
        inline: true,
        label: "JUDGE_DESIGNATION",
        isMandatory: false,
        key: "judgeDesignation",
        type: "text",
        populators: { name: "judgeDesignation", hideInForm: true },
      },
    ]
  }
];

export const configsOrderSubmissionExtension = [
  {
    head: "EXTENSION_OF_DOCUMENT_SUBMISSION_DATE",
    body: [
      {
        inline: true,
        label: "REF_APPLICATION_ID",
        isMandatory: false,
        key: "refApplicationId",
        type: "text",
        populators: { name: "refApplicationId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: false,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: false,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: false,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: false,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_NAME",
        isMandatory: false,
        key: "judgeName",
        type: "text",
        populators: { name: "judgeName", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_ORDER",
        isMandatory: false,
        key: "dateOfOrder",
        type: "date",
        populators: { name: "dateOfOrder", hideInForm: true },
      },
      {
        inline: true,
        label: "DOCUMENT_NAME",
        isMandatory: false,
        key: "documentName",
        type: "text",
        populators: { name: "documentName" },
      },
      {
        inline: true,
        label: "ADVOCATE_NAME",
        isMandatory: false,
        key: "advocateName",
        type: "text",
        populators: { name: "advocateName", hideInForm: true },
      },
      {
        inline: true,
        label: "APPLICATION_DATE",
        isMandatory: false,
        key: "applicationDate",
        type: "date",
        populators: { name: "applicationDate", hideInForm: true },
      },
      {
        inline: true,
        label: "ORIGINAL_SUBMISSION_ORDER_DATE",
        isMandatory: false,
        key: "originalSubmissionOrderDate",
        type: "date",
        populators: { name: "originalSubmissionOrderDate" },
      },
      {
        inline: true,
        label: "ORIGINAL_DEADLINE",
        isMandatory: false,
        key: "originalDeadline",
        type: "date",
        populators: { name: "originalDeadline" },
      },
      {
        inline: true,
        label: "PROPOSED_SUBMISSION_DATE",
        isMandatory: false,
        key: "proposedSubmissionDate",
        type: "date",
        populators: { name: "proposedSubmissionDate" },
      },
      {
        inline: true,
        label: "NEW_SUBMISSION_DATE",
        isMandatory: false,
        key: "newSubmissionDate",
        type: "date",
        populators: { name: "newSubmissionDate" },
      },
      {
        inline: true,
        label: "JUDGE_DESIGNATION",
        isMandatory: false,
        key: "judgeDesignation",
        type: "text",
        populators: { name: "judgeDesignation", hideInForm: true },
      },
    ]
  }
];

export const configsOrderTranferToADR = [
  {
    head: "TRANSFER_TO_ADR",
    body: [
      {
        inline: true,
        label: "REF_APPLICATION_ID",
        isMandatory: false,
        key: "refApplicationId",
        type: "text",
        populators: { name: "refApplicationId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: false,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: false,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: false,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "FILING_NUMBER",
        isMandatory: false,
        key: "filingNumber",
        type: "text",
        populators: { name: "filingNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_NAME",
        isMandatory: false,
        key: "judgeName",
        type: "text",
        populators: { name: "judgeName", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_ORDER",
        isMandatory: false,
        key: "dateOfOrder",
        type: "date",
        populators: { name: "dateOfOrder", hideInForm: true },
      },
      {
        inline: true,
        label: "ADR_MODE",
        isMandatory: false,
        key: "ADRMode",
        type: "dropdown",
        populators: {
          name: "ADRMode",
          optionsKey: "name",
          error: "Error!",
          required: false,
          options: [
            {
              code: "MODE_1",
              name: "MODE_1",
            },
            {
              code: "MODE_2",
              name: "MODE_2",
            },
            {
              code: "MODE_3",
              name: "MODE_3",
            },
          ],
        },
      },
      {
        inline: true,
        label: "JUDGE_DESIGNATION",
        isMandatory: false,
        key: "judgeDesignation",
        type: "text",
        populators: { name: "judgeDesignation", hideInForm: true },
      },
    ]
  }
];

export const configsScheduleHearingDate = [
  {
    head: "NEXT_HEARING",
    body: [
      {
        inline: true,
        label: "REF_APPLICATION_ID",
        isMandatory: false,
        key: "refApplicationId",
        type: "text",
        populators: { name: "refApplicationId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: false,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: false,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: false,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_NAME",
        isMandatory: false,
        key: "judgeName",
        type: "text",
        populators: { name: "judgeName", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_ORDER",
        isMandatory: false,
        key: "dateOfOrder",
        type: "date",
        populators: { name: "dateOfOrder", hideInForm: true },
      },
      {
        inline: true,
        label: "HEARING_PURPOSE",
        isMandatory: false,
        key: "hearingPurpose",
        type: "dropdown",
        populators: {
          name: "hearingPurpose",
          optionsKey: "name",
          error: "Error!",
          required: false,
          hideInForm: true,
          options: [
            {
              code: "HEARING_PURPOSE_1",
              name: "HEARING_PURPOSE_1",
            },
            {
              code: "HEARING_PURPOSE_2",
              name: "HEARING_PURPOSE_2",
            },
            {
              code: "HEARING_PURPOSE_3",
              name: "HEARING_PURPOSE_3",
            },
          ],
        },
      },
      {
        inline: true,
        label: "HEARING_DATE",
        isMandatory: false,
        key: "hearingDate",
        type: "date",
        populators: { name: "hearingDate" },
      },
      {
        inline: true,
        label: "JUDGE_DESIGNATION",
        isMandatory: false,
        key: "judgeDesignation",
        type: "text",
        populators: { name: "judgeDesignation", hideInForm: true },
      },
    ]
  }
];

export const configsRescheduleHearingDate = [
  {
    head: "ORDER_TYPE_RESCHEDULE_OF_HEARING_DATE",
    body: [
      {
        inline: true,
        label: "REF_APPLICATION_ID",
        isMandatory: false,
        key: "refApplicationId",
        type: "text",
        populators: { name: "refApplicationId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: false,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: false,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: false,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_ORDER",
        isMandatory: false,
        key: "dateOfOrder",
        type: "date",
        populators: { name: "dateOfOrder", hideInForm: true },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: false,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "RESCHEDULING_REASON",
        isMandatory: false,
        key: "reschedulingReason",
        type: "text",
        populators: { name: "reschedulingReason", hideInForm: true },
      },
      {
        inline: true,
        label: "APPLICTION_STATUS",
        isMandatory: false,
        key: "applicationStatus",
        type: "text",
        disable: true,
        populators: { name: "applicationStatus", hideInForm: true },
      },
      {
        inline: true,
        label: "ORIGINAL_HEARING_DATE",
        isMandatory: false,
        key: "originalHearingDate",
        type: "date",
        populators: { name: "originalHearingDate" },
      },
      {
        inline: true,
        label: "NEW_HEARING_DATE",
        isMandatory: false,
        key: "newHearingDate",
        type: "date",
        populators: { name: "newHearingDate" },
      },
      {
        inline: true,
        label: "JUDGE_NAME",
        isMandatory: false,
        key: "judgeName",
        type: "text",
        populators: { name: "judgeName", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_DESIGNATION",
        isMandatory: false,
        key: "judgeDesignation",
        type: "text",
        populators: { name: "judgeDesignation", hideInForm: true },
      },
    ]
  }
];

export const configsVoluntarySubmissionStatus = [
  {
    head: "VOLUNTARY_SUBMISSION_STATUS",
    body: [
      {
        inline: true,
        label: "REF_APPLICATION_ID",
        isMandatory: false,
        key: "refApplicationId",
        type: "text",
        populators: { name: "refApplicationId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: false,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: false,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: false,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_ORDER",
        isMandatory: false,
        key: "dateOfOrder",
        type: "date",
        populators: { name: "dateOfOrder", hideInForm: true },
      },
      {
        inline: true,
        label: "APPLICANT_NAME",
        isMandatory: false,
        key: "applicantName",
        type: "text",
        populators: { name: "applicantName", hideInForm: true },
      },
      {
        inline: true,
        label: "SUBMISSION_DATE",
        isMandatory: false,
        key: "submissionDate",
        type: "date",
        populators: { name: "submissionDate", hideInForm: true },
      },
      {
        inline: true,
        label: "SUBMISSION_ID",
        isMandatory: false,
        key: "submissionID",
        type: "text",
        populators: { name: "submissionID", hideInForm: true },
      },
      {
        inline: true,
        label: "SUBMISSION_TYPE",
        isMandatory: false,
        key: "submissionType",
        type: "date",
        populators: { name: "submissionType", hideInForm: true },
      },
      {
        inline: true,
        label: "APPROVAL_STATUS",
        isMandatory: false,
        key: "approvalStatus",
        type: "text",
        disable: true,
        populators: { name: "approvalStatus" },
      },
      {
        inline: true,
        label: "COMMENTS",
        isMandatory: false,
        key: "comments",
        type: "textarea",
        populators: { name: "comments" },
      },
      {
        inline: true,
        label: "JUDGE_NAME",
        isMandatory: false,
        key: "judgeName",
        type: "text",
        populators: { name: "judgeName", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_DESIGNATION",
        isMandatory: false,
        key: "judgeDesignation",
        type: "text",
        populators: { name: "judgeDesignation", hideInForm: true },
      },
    ]
  }
];

export const configsCaseTransfer = [
  {
    head: "CASE_TRANSFER",
    body: [
      {
        inline: true,
        label: "REF_APPLICATION_ID",
        isMandatory: false,
        key: "refApplicationId",
        type: "text",
        populators: { name: "refApplicationId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: false,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: false,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: false,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_ORDER",
        isMandatory: false,
        key: "dateOfOrder",
        type: "date",
        populators: { name: "dateOfOrder", hideInForm: true },
      },
      {
        inline: true,
        label: "COMPLAINANT_NAME",
        isMandatory: false,
        key: "complainantName",
        type: "textarea",
        populators: { name: "complainantName", hideInForm: true },
      },
      {
        inline: true,
        label: "COMPLAINANT_ADDRESS",
        isMandatory: false,
        key: "complainantAddress",
        type: "text",
        populators: { name: "complainantAddress", hideInForm: true },
      },
      {
        inline: true,
        label: "TRANSFER_SEEKED_TO",
        isMandatory: false,
        key: "transferSeekedTo",
        type: "text",
        populators: { name: "transferSeekedTo" },
      },
      {
        inline: true,
        label: "GROUNDS",
        isMandatory: false,
        key: "grounds",
        type: "textarea",
        populators: { name: "grounds" },
      },
      {
        inline: true,
        label: "APPROVAL_STATUS",
        isMandatory: false,
        key: "approvalStatus",
        type: "text",
        disable: true,
        populators: { name: "approvalStatus" },
      },
      {
        inline: true,
        label: "CASE_TRANSFERRED_TO",
        isMandatory: false,
        key: "caseTransferredTo",
        type: "text",
        populators: { name: "caseTransferredTo" },
      },
      {
        inline: true,
        label: "COMMENTS",
        isMandatory: false,
        key: "comments",
        type: "textarea",
        populators: { name: "comments" },
      },
      {
        inline: true,
        label: "JUDGE_NAME",
        isMandatory: false,
        key: "judgeName",
        type: "text",
        populators: { name: "judgeName", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_DESIGNATION",
        isMandatory: false,
        key: "judgeDesignation",
        type: "text",
        populators: { name: "judgeDesignation", hideInForm: true },
      },
    ]
  }
];

export const configsCaseSettlement = [
  {
    head: "CASE_SETTLEMENT",
    body: [
      {
        inline: true,
        label: "REF_APPLICATION_ID",
        isMandatory: false,
        key: "refApplicationId",
        type: "text",
        populators: { name: "refApplicationId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: false,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: false,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: false,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_ORDER",
        isMandatory: false,
        key: "dateOfOrder",
        type: "date",
        populators: { name: "dateOfOrder" },
      },
      {
        inline: true,
        label: "SETTLEMENT_AGREEMENT_DATE",
        isMandatory: false,
        key: "settlementAgreementDate",
        type: "date",
        populators: { name: "settlementAgreementDate" },
      },
      {
        inline: true,
        label: "SETTLEMENT_MECHANISM",
        isMandatory: false,
        key: "settlementMechanism",
        type: "dropdown",
        populators: {
          name: "settlementMechanism",
          optionsKey: "name",
          error: "Error!",
          required: false,
          options: [
            {
              code: "MECHANISM_1",
              name: "MECHANISM_1",
            },
            {
              code: "MECHANISM_2",
              name: "MECHANISM_2",
            },
            {
              code: "MECHANISM_3",
              name: "MECHANISM_3",
            },
          ],
        },
      },
      {
        inline: true,
        label: "SETTLEMENT_IMPLEMETED",
        isMandatory: false,
        key: "settlementImplemented",
        type: "checkbox",
        populators: { name: "settlementImplemented", title: "" },
      },
      {
        inline: true,
        label: "COMMENTS",
        isMandatory: false,
        key: "comments",
        type: "textarea",
        populators: { name: "comments", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_NAME",
        isMandatory: false,
        key: "judgeName",
        type: "text",
        populators: { name: "judgeName", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_DESIGNATION",
        isMandatory: false,
        key: "judgeDesignation",
        type: "text",
        populators: { name: "judgeDesignation", hideInForm: true },
      },
    ]
  }
];

export const configsIssueSummons = [
  {
    head: "SUMMONS",
    body: [
      {
        inline: true,
        label: "REF_APPLICATION_ID",
        isMandatory: false,
        key: "refApplicationId",
        type: "text",
        populators: { name: "refApplicationId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: false,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: false,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: false,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_ORDER",
        isMandatory: false,
        key: "dateOfOrder",
        type: "date",
        populators: { name: "dateOfOrder", hideInForm: true },
      },
      {
        inline: true,
        label: "ISSUE_SUMMONS_TO",
        isMandatory: false,
        key: "issueSummonsTo",
        type: "text",
        populators: { name: "issueSummonsTo", hideInForm: true },
      },
      {
        inline: true,
        label: "HEARING_DATE",
        isMandatory: false,
        key: "hearingDate",
        type: "date",
        populators: { name: "hearingDate", hideInForm: true },
      },
      {
        inline: true,
        label: "COMMENTS",
        isMandatory: false,
        key: "comments",
        type: "textarea",
        populators: { name: "comments", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_NAME",
        isMandatory: false,
        key: "judgeName",
        type: "text",
        populators: { name: "judgeName", hideInForm: true },
      },
      {
        inline: true,
        label: "JUDGE_DESIGNATION",
        isMandatory: false,
        key: "judgeDesignation",
        type: "text",
        populators: { name: "judgeDesignation", hideInForm: true },
      },
    ]
  }
];

export const configsBail = [
  {
    head: "BAIL",
    body: [
      {
        inline: true,
        label: "REF_APPLICATION_ID",
        isMandatory: false,
        key: "refApplicationId",
        type: "text",
        populators: { name: "refApplicationId" },
      },
      {
        inline: true,
        label: "COURT_NAME",
        isMandatory: false,
        key: "courtName",
        type: "text",
        populators: { name: "courtName", hideInForm: true },
      },
      {
        inline: true,
        label: "CASE_NAME",
        isMandatory: false,
        key: "caseName",
        type: "text",
        populators: { name: "caseName", hideInForm: true },
      },
      {
        inline: true,
        label: "CNR_NUMBER",
        isMandatory: false,
        key: "cnrNumber",
        type: "text",
        populators: { name: "cnrNumber", hideInForm: true },
      },
      {
        inline: true,
        label: "DATE_OF_ORDER",
        isMandatory: false,
        key: "dateOfOrder",
        type: "date",
        populators: { name: "dateOfOrder", hideInForm: true },
      },
      {
        inline: true,
        label: "BAIL_OF",
        isMandatory: false,
        key: "bailOf",
        type: "text",
        populators: { name: "bailOf" },
      },
      {
        inline: true,
        label: "SUMMARY",
        isMandatory: false,
        key: "summary",
        type: "textarea",
        populators: { name: "summary", hideInForm: true },
      },
      {
        inline: true,
        label: "ATTACHED_DOCUMENTS",
        isMandatory: false,
        key: "attachedDocuments",
        type: "textarea",
        populators: { name: "attachedDocuments", hideInForm: true },
      },
      {
        inline: true,
        label: "BAIL_TYPE",
        isMandatory: false,
        key: "bailType",
        type: "dropdown",
        populators: {
          name: "bailType",
          optionsKey: "name",
          error: "Error!",
          required: false,
          options: [
            {
              code: "SURETY",
              name: "SURETY",
            },
            {
              code: "BAIL_BOND",
              name: "BAIL_BOND",
            },
            {
              code: "CASH",
              name: "CASH",
            },
          ],
        },
      },
      {
        inline: true,
        label: "BAIL_AMOUNT",
        isMandatory: false,
        key: "bailAmount",
        type: "text",
        populators: { name: "bailAmount" },
      },
      {
        inline: true,
        label: "OTHER_CONDITIONS",
        isMandatory: false,
        key: "otherConditions",
        type: "text",
        populators: { name: "otherConditions" },
      },
    ]
  }
];

export const configsCreateOrderSchedule = [
  {
    head: "Order 1",
    defaultValues: {
      orderType: {
        id: 8,
        type: "NEXT_HEARING",
        isactive: true,
        code: "NEXT_HEARING",
      },
    },
    body: [
      {
        isMandatory: true,
        key: "Order Type",
        type: "dropdown",
        label: "ORDER_TYPE",
        disable: true,
        populators: {
          name: "orderType",
          optionsKey: "code",
          error: "required ",
          mdmsConfig: {
            masterName: "OrderType",
            moduleName: "Order",
            localePrefix: "ORDER_TYPE",
          },
        },
      },
      {
        isMandatory: true,
        key: "Hearing Type",
        type: "dropdown",
        label: "HEARING_TYPE",
        disable: false,
        populators: {
          name: "hearingType",
          optionsKey: "code",
          error: "required ",
          mdmsConfig: {
            masterName: "HearingType",
            moduleName: "Hearing",
            localePrefix: "HEARING_TYPE",
          },
        },
      },
      {
        isMandatory: true,
        key: "Parties to Attend",
        type: "dropdown",
        label: "PARTIES_TO_ATTEND",
        disable: false,
        populators: {
          name: "hearingType",
          optionsKey: "code",
          error: "required ",
          mdmsConfig: {
            masterName: "HearingType",
            moduleName: "Hearing",
            localePrefix: "HEARING_TYPE",
          },
        },
      },
      {
        inline: true,
        label: "DATE_OF_HEARING",
        isMandatory: true,
        key: "doh",
        type: "date",
        disable: false,
        populators: { name: "doh", error: "Required" },
      },
      {
        inline: true,
        label: "Purpose of Hearing",
        isMandatory: true,
        description: "",
        type: "textarea",
        disable: false,
        populators: { name: "purpose", error: "Error!" },
      },
      {
        inline: true,
        label: "Additional notes (optional)",
        isMandatory: true,
        description: "",
        type: "textarea",
        disable: false,
        populators: { name: "additionalNotes", error: "Error!" },
      },
    ],
  },
];

export const configsCreateOrderWarrant = [
  {
    head: "Order 1",
    defaultValues: {
      orderType: {
        id: 5,
        type: "WARRANT",
        isactive: true,
        code: "WARRANT",
      },
    },
    body: [
      {
        isMandatory: true,
        key: "Order Type",
        type: "dropdown",
        label: "ORDER_TYPE",
        disable: true,
        populators: {
          name: "orderType",
          optionsKey: "code",
          error: "required ",
          mdmsConfig: {
            masterName: "OrderType",
            moduleName: "Order",
            localePrefix: "ORDER_TYPE",
          },
        },
      },
      {
        inline: true,
        label: "DATE_OF_HEARING",
        isMandatory: true,
        key: "doh",
        type: "date",
        disable: false,
        populators: { name: "doh", error: "Required" },
      },
      {
        isMandatory: true,
        key: "Warrant For",
        type: "dropdown",
        label: "WARRANT_FOR_PARTY",
        disable: false,
        populators: {
          name: "warrantFor",
          optionsKey: "code",
          error: "required ",
          mdmsConfig: {
            masterName: "OrderType",
            moduleName: "Order",
            localePrefix: "ORDER_TYPE",
          },
        },
      },
      {
        isMandatory: true,
        key: "Warrant Type",
        type: "dropdown",
        label: "WARRANT_TYPE",
        disable: false,
        populators: {
          name: "warrantType",
          optionsKey: "code",
          error: "required ",
          mdmsConfig: {
            masterName: "OrderType",
            moduleName: "Order",
            localePrefix: "ORDER_TYPE",
          },
        },
      },
      {
        isMandatory: true,
        type: "radio",
        key: "bailable",
        label: "Is this a bailable warrant?",
        disable: false,
        populators: {
          name: "bailable",
          optionsKey: "name",
          error: "Error!",
          required: false,
          options: [
            {
              code: "Yes",
              name: "ES_COMMON_YES",
            },
            {
              code: "No",
              name: "ES_COMMON_NO",
            },
          ],
        },
      },
      // {
      //   isMandatory: true,
      //   key: "Document Type",
      //   type: "dropdown",
      //   label: "document type",
      //   disable: false,
      //   populators: {
      //     name: "genders",
      //     optionsKey: "name",
      //     error: "required ",
      //     mdmsConfig: {
      //       masterName: "GenderType",
      //       moduleName: "common-masters",
      //       localePrefix: "COMMON_GENDER",
      //     },
      //   },
      // },
      // {
      //   isMandatory: true,
      //   key: "Party / parties to make submission",
      //   type: "dropdown",
      //   label: "Order for document Submission",
      //   disable: false,
      //   populators: {
      //     name: "genders",
      //     optionsKey: "name",
      //     error: "required ",
      //     mdmsConfig: {
      //       masterName: "GenderType",
      //       moduleName: "common-masters",
      //       localePrefix: "COMMON_GENDER",
      //     },
      //   },
      // },
      // {
      //   inline: true,
      //   label: "deadline for submission",
      //   isMandatory: false,
      //   key: "dob",
      //   type: "date",
      //   disable: false,
      //   populators: { name: "dob", error: "Required"},
      // },

      //   {
      //     label: "Additional notes",
      //     isMandatory: true,
      //     key: "phno",
      //     type: "number",
      //     disable: false,
      //     populators: { name: "phno", error: "Required", validation: { min: 0, max: 9999999999 } },
      //   },
    ],
  },
];

export const configsCreateOrderSummon = [
  {
    head: "Order 1",
    defaultValues: {
      orderType: {
        id: 4,
        type: "SUMMONS",
        isactive: true,
        code: "SUMMONS",
      },
    },
    body: [
      {
        isMandatory: true,
        key: "Order Type",
        type: "dropdown",
        label: "ORDER_TYPE",
        disable: true,
        populators: {
          name: "orderType",
          optionsKey: "code",
          error: "required ",
          mdmsConfig: {
            masterName: "OrderType",
            moduleName: "Order",
            localePrefix: "ORDER_TYPE",
          },
        },
      },
      {
        inline: true,
        label: "DATE_OF_HEARING",
        isMandatory: true,
        key: "doh",
        type: "date",
        disable: false,
        populators: { name: "doh", error: "Required" },
      },
      {
        isMandatory: true,
        key: "Parties to SUMMON",
        type: "dropdown",
        label: "PARTIES_TO_SUMMON",
        disable: false,
        populators: {
          name: "partyToSummon",
          optionsKey: "code",
          error: "required ",
          mdmsConfig: {
            masterName: "HearingType",
            moduleName: "Hearing",
            localePrefix: "HEARING_TYPE",
          },
        },
      },
      {
        isMandatory: false,
        key: "deliveryChannels",
        type: "component", // for custom component
        component: "DeliveryChannels", // name of the component as per component registry
        withoutLabel: true,
        disable: false,
        customProps: {},
        populators: {
          name: "deliveryChannels",
          required: true,
        },
      },
    ],
  },
];

export const configsCreateOrderReIssueSummon = [
  {
    head: "Order 1",
    body: [
      {
        isMandatory: true,
        key: "Order Type",
        type: "dropdown",
        label: "order type",
        disable: false,
        populators: {
          name: "genders",
          optionsKey: "name",
          error: "required ",
          mdmsConfig: {
            masterName: "OrderType",
            moduleName: "Order",
            localePrefix: "ORDER_TYPE",
          },
        },
      },
      // {
      //   isMandatory: true,
      //   key: "Document Type",
      //   type: "dropdown",
      //   label: "document type",
      //   disable: false,
      //   populators: {
      //     name: "genders",
      //     optionsKey: "name",
      //     error: "required ",
      //     mdmsConfig: {
      //       masterName: "GenderType",
      //       moduleName: "common-masters",
      //       localePrefix: "COMMON_GENDER",
      //     },
      //   },
      // },
      // {
      //   isMandatory: true,
      //   key: "Party / parties to make submission",
      //   type: "dropdown",
      //   label: "Order for document Submission",
      //   disable: false,
      //   populators: {
      //     name: "genders",
      //     optionsKey: "name",
      //     error: "required ",
      //     mdmsConfig: {
      //       masterName: "GenderType",
      //       moduleName: "common-masters",
      //       localePrefix: "COMMON_GENDER",
      //     },
      //   },
      // },
      //   {
      //     inline: true,
      //     label: "deadline for submission",
      //     isMandatory: false,
      //     key: "dob",
      //     type: "date",
      //     disable: false,
      //     populators: { name: "dob", error: "Required"},
      //   },

      //   {
      //     label: "Additional notes",
      //     isMandatory: true,
      //     key: "phno",
      //     type: "number",
      //     disable: false,
      //     populators: { name: "phno", error: "Required", validation: { min: 0, max: 9999999999 } },
      //   },
    ],
  },
];
