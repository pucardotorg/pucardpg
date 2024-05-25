package org.pucar.dristi.service;
import org.egov.common.contract.request.RequestInfo;
import org.egov.common.contract.request.User;
import org.egov.tracer.model.CustomException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import org.pucar.dristi.config.Configuration;
import org.pucar.dristi.enrichment.AdvocateClerkRegistrationEnrichment;
import org.pucar.dristi.kafka.Producer;
import org.pucar.dristi.repository.AdvocateClerkRepository;
import org.pucar.dristi.validators.AdvocateClerkRegistrationValidator;
import org.pucar.dristi.web.models.AdvocateClerk;
import org.pucar.dristi.web.models.AdvocateClerkRequest;
import org.pucar.dristi.web.models.AdvocateClerkSearchCriteria;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.*;

import java.util.*;
import java.util.concurrent.atomic.AtomicReference;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class AdvocateClerkServiceTest {

    @InjectMocks
    private AdvocateClerkService advocateClerkService;

    @Mock
    private AdvocateClerkRepository advocateClerkRepository;

    @Mock
    private AdvocateClerkRegistrationValidator validator;

    @Mock
    private AdvocateClerkRegistrationEnrichment enrichmentUtil;

    @Mock
    private WorkflowService workflowService;

    @Mock
    private IndividualService individualService;

    @Mock
    private Producer producer;

    @Mock
    private Configuration config;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testRegisterAdvocateClerkRequest_Success() {
        // Mock data
        AdvocateClerkRequest request = new AdvocateClerkRequest();
        // Setup mocks
        when(config.getAdvClerkcreateTopic()).thenReturn("advClerkCreateTopic");
        // Test method
        advocateClerkService.registerAdvocateClerkRequest(request);
        // Verify interactions
        verify(validator).validateAdvocateClerkRegistration(request);
        verify(enrichmentUtil).enrichAdvocateClerkRegistration(request);
        verify(workflowService).updateWorkflowStatus(request);
        verify(producer).push("advClerkCreateTopic", request);
    }

    @Test
    void registerAdvocateClerkRequest_Exception() {
        // Arrange
        AdvocateClerkRequest advocateClerkRequest = new AdvocateClerkRequest();

        doThrow(new RuntimeException("Internal error")).when(validator).validateAdvocateClerkRegistration(any());

        // Act and Assert
        assertThrows(Exception.class, () -> {
            advocateClerkService.registerAdvocateClerkRequest(advocateClerkRequest);
        });
    }

//    @Test
//    void registerAdvocateClerkRequest_ValidationFailure() {
//        // Arrange
//        AdvocateClerkRequest advocateClerkRequest = new AdvocateClerkRequest();
//        // Set up the request to trigger validation failure
//        List<AdvocateClerk> list = new ArrayList<>();
//        AdvocateClerk clerk = new AdvocateClerk();
//        list.add(clerk);
//        advocateClerkRequest.setClerks(list);
//
////        doThrow(new Exception("Validation failed")).when(validator).validateAdvocateClerkRegistration(any());
////        when(validator.validateAdvocateClerkRegistration(any())).thenThrow(Exception.class);
//
//        // Act and Assert
//        assertThrows(Exception.class, () -> {
//            advocateClerkService.registerAdvocateClerkRequest(advocateClerkRequest);
//        });
//    }

    @Test
    void searchAdvocateClerkApplications_IndividualLoggedInUser() {
        // Arrange
        RequestInfo requestInfo = new RequestInfo();
        User userInfo = new User();
        userInfo.setType("INDIVIDUAL");
        userInfo.setUuid(UUID.randomUUID().toString());
        requestInfo.setUserInfo(userInfo);

        List<AdvocateClerkSearchCriteria> advocateClerkSearchCriteria = new ArrayList<>();
        // Populate advocateClerkSearchCriteria with test data

        String tenantId = "testTenantId";
        Integer limit = 10;
        Integer offset = 0;

        AtomicReference<Boolean> isIndividualLoggedInUser = new AtomicReference<>(false);
        Map<String, String> individualUserUUID = new HashMap<>();
        individualUserUUID.put("userUuid", userInfo.getUuid());

//        when(individualService.searchIndividual(any(), any(), any())).thenReturn(true);

        // Act
        List<AdvocateClerk> result = advocateClerkService.searchAdvocateClerkApplications(requestInfo, advocateClerkSearchCriteria, tenantId, limit, offset);

        // Assert
        assertNotNull(result);
        // Add assertions to verify the behavior based on your logic
    }

    @Test
    void searchAdvocateClerkApplications_IndividualLoggedInUserEmploye() {
        // Arrange
        RequestInfo requestInfo = new RequestInfo();
        User userInfo = new User();
        userInfo.setType("EMPLOYEE");
        userInfo.setUuid(UUID.randomUUID().toString());
        requestInfo.setUserInfo(userInfo);

        List<AdvocateClerkSearchCriteria> advocateClerkSearchCriteria = new ArrayList<>();
        // Populate advocateClerkSearchCriteria with test data

        String tenantId = "testTenantId";
        Integer limit = null;
        Integer offset = null;

        AtomicReference<Boolean> isIndividualLoggedInUser = new AtomicReference<>(false);
        Map<String, String> individualUserUUID = new HashMap<>();
        individualUserUUID.put("userUuid", userInfo.getUuid());

        // Act
        List<AdvocateClerk> result = advocateClerkService.searchAdvocateClerkApplications(requestInfo, advocateClerkSearchCriteria, tenantId, limit, offset);

        // Assert
        assertNotNull(result);
    }

    @Test
    void searchAdvocateClerkApplicationsByAppNumber_Success() {
        // Arrange
        String applicationNumber = "testAppNumber";
        String tenantId = "testTenantId";
        Integer limit = 10;
        Integer offset = 0;

        List<AdvocateClerk> applications = new ArrayList<>();
        AdvocateClerk clerk = new AdvocateClerk();
        clerk.setApplicationNumber("appNum1");
        clerk.setTenantId("tenantId");
        applications.add(clerk);

        when(advocateClerkRepository.getApplicationsByAppNumber(anyString(), anyString(), anyInt(), anyInt())).thenReturn(applications);

        // Act
        List<AdvocateClerk> result = advocateClerkService.searchAdvocateClerkApplicationsByAppNumber(applicationNumber, tenantId, limit, offset);

        // Assert
        assertNotNull(result);
        assertEquals(applications, result);
    }

    @Test
    void searchAdvocateClerkApplicationsByAppNumber_Exception() {
        // Arrange
        String applicationNumber = "testAppNumber";
        String tenantId = "testTenantId";
        Integer limit = null;
        Integer offset = null;

        when(advocateClerkRepository.getApplicationsByAppNumber(anyString(), anyString(), anyInt(), anyInt())).thenThrow(RuntimeException.class);
        // Act and Assert
        assertThrows(Exception.class, () -> {
            advocateClerkService.searchAdvocateClerkApplicationsByAppNumber(applicationNumber, tenantId, limit, offset);
        });
    }

    @Test
    void searchAdvocateClerkApplicationsByAppNumber_EmptySuccess() {
        // Arrange
        String applicationNumber = "testAppNumber";
        String tenantId = "testTenantId";
        Integer limit = null;
        Integer offset = null;

        List<AdvocateClerk> applications = new ArrayList<>();
        // Populate applications with test data

        when(advocateClerkRepository.getApplicationsByAppNumber(anyString(), anyString(), anyInt(), anyInt())).thenReturn(applications);

        // Act
        List<AdvocateClerk> result = advocateClerkService.searchAdvocateClerkApplicationsByAppNumber(applicationNumber, tenantId, limit, offset);

        // Assert
        assertNotNull(result);
        assertEquals(applications, result);
    }

    @Test
    void searchAdvocateClerkApplicationsByStatus_Success() {
        // Arrange
        String status = "testStatus";
        String tenantId = "testTenantId";
        Integer limit = 10;
        Integer offset = 0;

        List<AdvocateClerk> applications = new ArrayList<>();
        AdvocateClerk clerk = new AdvocateClerk();
        clerk.setApplicationNumber("appNum1");
        clerk.setTenantId("tenantId");
        applications.add(clerk);

        when(advocateClerkRepository.getApplicationsByStatus(anyString(), anyString(), anyInt(), anyInt())).thenReturn(applications);

        // Act
        List<AdvocateClerk> result = advocateClerkService.searchAdvocateClerkApplicationsByStatus(status, tenantId, limit, offset);

        // Assert
        assertNotNull(result);
        assertEquals(applications, result);
    }

    @Test
    void searchAdvocateClerkApplicationsByStatus_EmptySuccess() {
        // Arrange
        String status = "testStatus";
        String tenantId = "testTenantId";
        Integer limit = null;
        Integer offset = null;

        List<AdvocateClerk> applications = new ArrayList<>();
        // Populate applications with test data

        when(advocateClerkRepository.getApplicationsByStatus(anyString(), anyString(), anyInt(), anyInt())).thenReturn(applications);

        // Act
        List<AdvocateClerk> result = advocateClerkService.searchAdvocateClerkApplicationsByStatus(status, tenantId, limit, offset);

        // Assert
        assertNotNull(result);
        assertEquals(applications, result);
    }

    @Test
    void searchAdvocateClerkApplicationsByStatus_Exception() {
        // Arrange
        String status = "testStatus";
        String tenantId = "testTenantId";
        Integer limit = null;
        Integer offset = null;

        when(advocateClerkRepository.getApplicationsByStatus(anyString(), anyString(), anyInt(), anyInt())).thenThrow(new RuntimeException());

        // Assert
        assertThrows(Exception.class, () -> advocateClerkService.searchAdvocateClerkApplicationsByStatus(status, tenantId, limit, offset));
    }

    @Test
    void updateAdvocateClerk_EmptySuccess() {
        // Arrange
        AdvocateClerkRequest advocateClerkRequest = new AdvocateClerkRequest();
        AdvocateClerk clerk = new AdvocateClerk();
        // Populate clerks with test data
        advocateClerkRequest.setClerk(clerk);

        when(validator.validateApplicationExistence(any())).thenReturn(new AdvocateClerk());
        doNothing().when(enrichmentUtil).enrichAdvocateClerkApplicationUponUpdate(any());
        doNothing().when(workflowService).updateWorkflowStatus((AdvocateClerkRequest) any());
        when(config.getAdvClerkUpdateTopic()).thenReturn("testTopic");
        doNothing().when(producer).push(anyString(), any());

        // Act
        AdvocateClerk result = advocateClerkService.updateAdvocateClerk(advocateClerkRequest);

        // Assert
        assertNotNull(result);
        assertEquals(clerk, result);
        // Add more assertions as needed
    }

    @Test
    void updateAdvocateClerk_Success() {
        // Arrange
        AdvocateClerkRequest advocateClerkRequest = new AdvocateClerkRequest();
        AdvocateClerk clerk = new AdvocateClerk();
        clerk.setApplicationNumber("appNum1");
        clerk.setTenantId("tenantId");
        advocateClerkRequest.setClerk(clerk);

        when(validator.validateApplicationExistence(any())).thenReturn(clerk);
        doNothing().when(enrichmentUtil).enrichAdvocateClerkApplicationUponUpdate(any());
        doNothing().when(workflowService).updateWorkflowStatus((AdvocateClerkRequest) any());
        when(config.getAdvClerkUpdateTopic()).thenReturn("testTopic");
        doNothing().when(producer).push(anyString(), any());

        // Act
        AdvocateClerk result = advocateClerkService.updateAdvocateClerk(advocateClerkRequest);

        // Assert
        assertNotNull(result);
        assertEquals(clerk, result);
        // Add more assertions as needed
    }

    @Test
    void updateAdvocate_ValidationCustomException() {
        // Arrange
        AdvocateClerkRequest advocateClerkRequest = new AdvocateClerkRequest();
        AdvocateClerk clerk = new AdvocateClerk();
        clerk.setApplicationNumber("appNum1");
        clerk.setTenantId("tenantId");
        advocateClerkRequest.setClerk(clerk);

        when(validator.validateApplicationExistence(any())).thenThrow(CustomException.class);

        // Assert
        assertThrows(CustomException.class, () -> advocateClerkService.updateAdvocateClerk(advocateClerkRequest));
    }

    @Test
    void updateAdvocateClerk_ValidationException() {
        // Arrange
        AdvocateClerkRequest advocateClerkRequest = new AdvocateClerkRequest();
        AdvocateClerk clerk = new AdvocateClerk();
        clerk.setApplicationNumber("appNum1");
        clerk.setTenantId("tenantId");
        advocateClerkRequest.setClerk(clerk);

        when(validator.validateApplicationExistence(any())).thenThrow(RuntimeException.class);

        // Assert
        assertThrows(Exception.class, () -> advocateClerkService.updateAdvocateClerk(advocateClerkRequest));
    }

}

