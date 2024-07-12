-- Insert mock data for Organization
INSERT INTO Organization (name, created_at, updated_at)
VALUES ('Organization A', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Organization B', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       ('Organization C', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert mock data for Location
INSERT INTO Location (organization_id, name, address, business_hours, created_at, updated_at)
VALUES (1, 'Location 1', '123 Main St, City A', '{"monday": "9am - 5pm", "tuesday": "9am - 5pm"}'::JSONB, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 'Location 2', '456 Oak St, City B', '{"wednesday": "10am - 6pm", "thursday": "10am - 6pm"}'::JSONB, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 'Location X', '789 Elm St, City C', '{"friday": "8am - 4pm", "saturday": "Closed"}'::JSONB, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert mock data for Room
INSERT INTO Room (location_id, name, capacity, created_at, updated_at)
VALUES (1, 'Room 101', 10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 'Room 102', 15, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 'Conference Room A', 20, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert mock data for Profile
INSERT INTO Profile (organization_id, role, is_approved, email, created_at, updated_at)
VALUES (1, 'Admin', true, 'admin@organizationA.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 'User', false, 'user@organizationB.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (3, 'Manager', true, 'manager@organizationC.com', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert mock data for Staff
INSERT INTO Staff (organization_id, name, role, created_at, updated_at)
VALUES (1, 'John Doe', 'Manager', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 'Jane Smith', 'Assistant', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 'Alice Brown', 'Developer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert mock data for Availability
INSERT INTO Availability (organization_id, staff_id, day_of_week, start_time, end_time, created_at, updated_at)
VALUES (1, 1, 'Monday', '09:00:00', '17:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 2, 'Tuesday', '10:00:00', '18:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 3, 'Wednesday', '08:00:00', '16:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert mock data for Contact
INSERT INTO Contact (organization_id, name, title, created_at, updated_at)
VALUES (1, 'Emily Johnson', 'Sales Manager', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 'Mark Davis', 'Support Specialist', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (3, 'Sarah Wilson', 'Marketing Director', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert mock data for Service
INSERT INTO Service (organization_id, name, description, created_at, updated_at)
VALUES (1, 'Consultation', 'Initial consultation service', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 'Support', 'Technical support service', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 'Training', 'Employee training service', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert mock data for Request
INSERT INTO Request (organization_id, location_id, service_id, status, created_at, updated_at, documents)
VALUES (1, 1, 1, 'Draft', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{"document1": "content1", "document2": "content2"}'::JSONB),
       (2, 3, 3, 'Completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{"training_materials": "link_to_materials"}'::JSONB),
       (1, 2, 2, 'Waiting', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{"support_request": "issue_description"}'::JSONB);

-- Insert mock data for RequestContact
INSERT INTO RequestContact (request_id, contact_id)
VALUES (1, 1),
       (2, 2),
       (3, 3);

-- Insert mock data for RequestContactAvailability
INSERT INTO RequestContactAvailability (requestcontact_id, day_of_week, start_time, end_time)
VALUES (1, 'Monday', '09:00:00', '17:00:00'),
       (2, 'Tuesday', '10:00:00', '18:00:00'),
       (3, 'Wednesday', '08:00:00', '16:00:00');

-- Insert mock data for CaseFile
INSERT INTO CaseFile (organization_id, request_id, status, created_at, updated_at, documents)
VALUES (1, 1, 'Open', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{"case_notes": "details_of_case"}'::JSONB),
       (2, 3, 'Closed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{"case_summary": "resolution_details"}'::JSONB),
       (1, 2, 'InProgress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{"case_details": "progress_report"}'::JSONB);

-- Insert mock data for CaseFileContact
INSERT INTO CaseFileContact (casefile_id, contact_id, status, created_at, updated_at, documents)
VALUES (1, 1, 'pending', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{"contact_notes": "interaction_details"}'::JSONB),
       (2, 2, 'inprogress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{"contact_summary": "feedback_details"}'::JSONB),
       (3, 3, 'complete', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, '{"contact_logs": "communication_details"}'::JSONB);

-- Insert mock data for Appointment
INSERT INTO Appointment (organization_id, casefile_id, service_id, location_id, room_id, staff_id, date, time_start, time_end, state, created_at, updated_at)
VALUES (1, 1, 1, 1, 1, 1, '2024-07-01', '09:00:00', '10:00:00', 'Scheduled', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 2, 3, 3, 3, 3, '2024-07-02', '10:00:00', '12:00:00', 'Completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 3, 2, 2, 2, 2, '2024-07-03', '11:00:00', '13:00:00', 'Confirmed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert mock data for Report
INSERT INTO Report (organization_id, name, description, content, status, created_at, updated_at)
VALUES (1, 'Monthly Report', 'Summary of activities for the month', 'Detailed content of the report', 'Completed', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 'Quarterly Review', 'Analysis of quarterly performance', 'Detailed analysis and findings', 'Draft', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 'Yearly Analysis', 'Annual overview and projections', 'Comprehensive data and projections', 'InProgress', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insert mock data for Note
INSERT INTO Note (organization_id, appointment_id, report_id, created_at, updated_at)
VALUES (1, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 2, NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 3, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
