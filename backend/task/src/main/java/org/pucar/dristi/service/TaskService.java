package org.pucar.dristi.service;

import lombok.extern.slf4j.Slf4j;
import org.egov.common.contract.request.RequestInfo;
import org.egov.tracer.model.CustomException;
import org.pucar.dristi.config.Configuration;
import org.pucar.dristi.enrichment.TaskRegistrationEnrichment;
import org.pucar.dristi.kafka.Producer;
import org.pucar.dristi.repository.TaskRepository;
import org.pucar.dristi.util.WorkflowUtil;
import org.pucar.dristi.validators.TaskRegistrationValidator;
import org.pucar.dristi.web.models.Task;
import org.pucar.dristi.web.models.TaskExists;
import org.pucar.dristi.web.models.TaskExistsRequest;
import org.pucar.dristi.web.models.TaskRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.pucar.dristi.config.ServiceConstants.*;

@Service
@Slf4j
public class TaskService {

    private TaskRegistrationValidator validator;

    @Autowired
    private TaskRegistrationEnrichment enrichmentUtil;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private WorkflowUtil workflowUtil;

    @Autowired
    private Configuration config;

    @Autowired
    private Producer producer;

    @Autowired
    public void setValidator(@Lazy TaskRegistrationValidator validator) {
        this.validator = validator;
    }


    public Task createTask(TaskRequest body) {
        try {
            validator.validateCaseRegistration(body);

            enrichmentUtil.enrichTaskRegistration(body);

            workflowUpdate(body);

            producer.push(config.getTaskCreateTopic(), body);

            return body.getTask();

        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error occurred while creating task :: {}", e.toString());
            throw new CustomException(CREATE_TASK_ERR, e.getMessage());
        }
    }

    public List<Task> searchTask(String id, String tenantId, String status, UUID orderId, String cnrNumber, String taskNumber, RequestInfo requestInfo) {

        try {
            // Fetch tasks from database according to the given search criteria
            List<Task> result = taskRepository.getApplications(id, tenantId, status, orderId, cnrNumber, taskNumber);
            // If no task are found matching the given criteria, return an empty list
            if (CollectionUtils.isEmpty(result))
                return new ArrayList<>();
            return result;
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error while fetching task results :: {}", e.toString());
            throw new CustomException(SEARCH_TASK_ERR, e.getMessage());
        }
    }

    public Task updateTask(TaskRequest body) {

        try {
            // Validate whether the application that is being requested for update indeed exists
            if (!validator.validateApplicationExistence(body.getTask(), body.getRequestInfo()))
                throw new CustomException(VALIDATION_ERR, "Task Application does not exist");

            // Enrich application upon update
            enrichmentUtil.enrichCaseApplicationUponUpdate(body);

            workflowUpdate(body);

            producer.push(config.getTaskCreateTopic(), body);

            return body.getTask();

        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error occurred while updating task :: {}", e.toString());
            throw new CustomException(UPDATE_TASK_ERR, "Error occurred while updating task: " + e.getMessage());
        }

    }

    public TaskExists existTask(TaskExistsRequest taskExistsRequest) {
        try {
            return taskRepository.checkTaskExists(taskExistsRequest.getTask());
        } catch (CustomException e) {
            throw e;
        } catch (Exception e) {
            log.error("Error while fetching to exist task :: {}", e.toString());
            throw new CustomException(EXIST_TASK_ERR, e.getMessage());
        }
    }

    private void workflowUpdate(TaskRequest body){
        if (body.getTask().getTaskType().equalsIgnoreCase(BAIL)) {
            body.getTask().setStatus(workflowUtil.updateWorkflowStatus(body.getRequestInfo(), body.getTask().getTenantId(), body.getTask().getTaskNumber(),
                    config.getTaskBailBusinessServiceName(), body.getTask().getWorkflow(), config.getTaskBailBusinessName()));
        }
        if (body.getTask().getTaskType().equalsIgnoreCase(SUMMON)) {
            body.getTask().setStatus(workflowUtil.updateWorkflowStatus(body.getRequestInfo(), body.getTask().getTenantId(), body.getTask().getTaskNumber(),
                    config.getTaskSummonBusinessServiceName(), body.getTask().getWorkflow(), config.getTaskSummonBusinessName()));
        }
        if (body.getTask().getTaskType().equalsIgnoreCase(WARRANT)) {
            body.getTask().setStatus(workflowUtil.updateWorkflowStatus(body.getRequestInfo(), body.getTask().getTenantId(), body.getTask().getTaskNumber(),
                    config.getTaskWarrantBusinessServiceName(), body.getTask().getWorkflow(), config.getTaskWarrantBusinessName()));
        } else {
            body.getTask().setStatus(workflowUtil.updateWorkflowStatus(body.getRequestInfo(), body.getTask().getTenantId(), body.getTask().getTaskNumber(),
                    config.getTaskBusinessServiceName(), body.getTask().getWorkflow(), config.getTaskBusinessName()));
        }
    }
}