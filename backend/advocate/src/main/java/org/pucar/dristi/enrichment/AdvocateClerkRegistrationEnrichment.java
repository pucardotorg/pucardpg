package org.pucar.dristi.enrichment;


import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.models.AuditDetails;
import org.egov.tracer.model.CustomException;
import org.pucar.dristi.config.Configuration;
import org.pucar.dristi.util.IdgenUtil;
import org.pucar.dristi.web.models.AdvocateClerk;
import org.pucar.dristi.web.models.AdvocateClerkRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.UUID;

import static org.pucar.dristi.config.ServiceConstants.ENRICHMENT_EXCEPTION;

@Component
@Slf4j
public class AdvocateClerkRegistrationEnrichment {

    @Autowired
    private IdgenUtil idgenUtil;
    @Autowired
    private Configuration configuration;

    /**
     * Enrich the advocate clerk application by setting values in different field
     *
     * @param advocateClerkRequest the advocate clerk registration request body
     */
    public void enrichAdvocateClerkRegistration(AdvocateClerkRequest advocateClerkRequest) {
        try {
            List<String> clerkApplicationNumbers = idgenUtil.getIdList(advocateClerkRequest.getRequestInfo(), advocateClerkRequest.getRequestInfo().getUserInfo().getTenantId(), configuration.getAdvApplicationNumberConfig(), null, advocateClerkRequest.getClerks().size());
            log.info("Advocate Clerk Application Number :: {}",clerkApplicationNumbers);
            int index = 0;
            for (AdvocateClerk advocateClerk : advocateClerkRequest.getClerks()) {
                AuditDetails auditDetails = AuditDetails.builder().createdBy(advocateClerkRequest.getRequestInfo().getUserInfo().getUuid()).createdTime(System.currentTimeMillis()).lastModifiedBy(advocateClerkRequest.getRequestInfo().getUserInfo().getUuid()).lastModifiedTime(System.currentTimeMillis()).build();
                advocateClerk.setAuditDetails(auditDetails);

                advocateClerk.setId(UUID.randomUUID());
                //setting false unless the application is approved
                advocateClerk.setIsActive(false);
                if (advocateClerk.getDocuments() != null)
                    advocateClerk.getDocuments().forEach(document -> {
                        document.setId(String.valueOf(UUID.randomUUID()));
                    });

                //setting generated application number
                advocateClerk.setApplicationNumber(clerkApplicationNumbers.get(index++));
            }
        } catch (CustomException e) {
            log.error("Custom Exception occurred while Enriching advocate clerk");
            throw e;
        } catch (Exception e) {
            log.error("Error enriching advocate clerk application: {}", e.getMessage());
            throw new CustomException(ENRICHMENT_EXCEPTION, "Error in clerk enrichment service: " + e.getMessage());
        }
    }

    /**
     * Enrich the advocate clerk application on update
     *
     * @param advocateClerkRequest the advocate registration request body
     */
    public void enrichAdvocateClerkApplicationUponUpdate(AdvocateClerkRequest advocateClerkRequest) {
        try {
            // Enrich lastModifiedTime and lastModifiedBy in case of update
            for (AdvocateClerk advocateClerk : advocateClerkRequest.getClerks()) {
                advocateClerk.getAuditDetails().setLastModifiedTime(System.currentTimeMillis());
                advocateClerk.getAuditDetails().setLastModifiedBy(advocateClerkRequest.getRequestInfo().getUserInfo().getUuid());
            }
        } catch (Exception e) {
            log.error("Error enriching advocate clerk  application upon update: {}", e.getMessage());
            throw new CustomException(ENRICHMENT_EXCEPTION, "Error in clerk enrichment service during update: " + e.getMessage());
        }
    }
}