package org.pucar.dristi.repository.rowmapper;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.models.AuditDetails;
import org.egov.tracer.model.CustomException;
import org.postgresql.util.PGobject;
import org.pucar.dristi.web.models.CourtCase;
import org.pucar.dristi.web.models.LinkedCase;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.util.*;

@Component
@Slf4j
public class LinkedCaseRowMapper implements ResultSetExtractor<List<LinkedCase>> {
    public List<LinkedCase> extractData(ResultSet rs) {
        Map<String, LinkedCase> linkedCaseMap = new LinkedHashMap<>();

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            while (rs.next()) {
                String id = rs.getString("id");
                LinkedCase linkedCase = linkedCaseMap.get(id);

                if (linkedCase == null) {
                    Long lastModifiedTime = rs.getLong("lastmodifiedtime");
                    if (rs.wasNull()) {
                        lastModifiedTime = null;
                    }


                    AuditDetails auditdetails = AuditDetails.builder()
                            .createdBy(rs.getString("createdby"))
                            .createdTime(rs.getLong("createdtime"))
                            .lastModifiedBy(rs.getString("lastmodifiedby"))
                            .lastModifiedTime(lastModifiedTime)
                            .build();
                    linkedCase = LinkedCase.builder()
                            .id(UUID.fromString(rs.getString("id")))
                            .relationshipType(rs.getString("relationshiptype"))
                            .caseNumber(rs.getString("casenumber"))
                            .auditdetails(auditdetails)
                            .build();
                }

                PGobject pgObject = (PGobject) rs.getObject("additionalDetails");
                if(pgObject!=null)
                    linkedCase.setAdditionalDetails(objectMapper.readTree(pgObject.getValue()));

                linkedCaseMap.put(id, linkedCase);
            }
        }
        catch (Exception e){
            log.error("Error occurred while processing Case ResultSet: {}", e.getMessage());
            throw new CustomException("ROW_MAPPER_EXCEPTION","Error occurred while processing Case ResultSet: "+ e.getMessage());
        }
        return new ArrayList<>(linkedCaseMap.values());
    }
    private UUID toUUID(String toUuid) {
        if(toUuid == null) {
            return null;
        }
        return UUID.fromString(toUuid);
    }
}
