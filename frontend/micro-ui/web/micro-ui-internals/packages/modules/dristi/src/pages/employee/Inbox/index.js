import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Header, InboxSearchComposer, Loader } from "@egovernments/digit-ui-react-components";

const Digit = window?.Digit || {};
const config = {
  label: "ES_COMMON_INBOX",
  type: "inbox",
  apiDetails: {
    serviceName: "/advocate/v1/_search",
    requestParam: {},
    requestBody: {
      criteria: [],
      status: ["INWORKFLOW"],
    },
    minParametersForSearchForm: 1,
    masterName: "commonUiConfig",
    moduleName: "registrationRequestsConfig",
    searchFormJsonPath: "requestBody.criteria[0]",
  },
  sections: {
    search: {
      uiConfig: {
        headerStyle: null,
        type: "registration-requests-table-search",
        primaryLabel: "ES_COMMON_SEARCH",
        secondaryLabel: "ES_COMMON_CLEAR_SEARCH",
        minReqFields: 1,
        defaultValues: {
          applicationNumber: "",
        },
        fields: [
          {
            label: "Application No",
            type: "text",
            isMandatory: false,
            disable: false,
            populators: {
              name: "applicationNumber",
              error: "BR_PATTERN_ERR_MSG",
              validation: {
                pattern: {},
                minlength: 2,
              },
            },
          },
        ],
      },
      label: "",
      children: {},
      show: true,
    },
    searchResult: {
      label: "",
      uiConfig: {
        columns: [
          {
            label: "Application No",
            jsonPath: "applicationNumber",
            additionalCustomization: true,
          },
          {
            label: "User Name",
            jsonPath: "username",
          },
          {
            label: "User Type",
            jsonPath: "usertype",
            additionalCustomization: true,
          },
          {
            label: "Date Created",
            jsonPath: "auditDetails.createdTime",
          },
          {
            label: "Due Since (no of days)",
            jsonPath: "dueSince",
          },
          { label: "Action", jsonPath: "apply", additionalCustomization: true },
        ],
        enableGlobalSearch: false,
        enableColumnSort: true,
        resultsJsonPath: "advocates",
      },
      children: {},
      show: true,
    },
  },
  additionalSections: {},
};

const sectionsParentStyle = {
  height: "50%",
  display: "flex",
  flexDirection: "column",
  gridTemplateColumns: "20% 1fr",
  gap: "1rem",
};

const Inbox = ({ tenants, parentRoute }) => {
  const { t } = useTranslation();
  Digit.SessionStorage.set("ENGAGEMENT_TENANTS", tenants);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [pageSize, setPageSize] = useState(10);
  const [pageOffset, setPageOffset] = useState(0);
  const [searchParams, setSearchParams] = useState({
    eventStatus: [],
    range: {
      startDate: null,
      endDate: new Date(""),
      title: "",
    },
    ulb: tenants?.find((tenant) => tenant?.code === tenantId),
  });
  let isMobile = window.Digit.Utils.browser.isMobile();
  const [data, setData] = useState([]);
  const { isLoading } = data;

  if (isLoading) {
    return <Loader />;
  }
  return (
    <React.Fragment>
      <div>
        <Header>{t("Registration-Requests")}</Header>
        <p>{}</p>
        <div className="inbox-search-wrapper">
          <InboxSearchComposer customStyle={sectionsParentStyle} configs={config}></InboxSearchComposer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Inbox;