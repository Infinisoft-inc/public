-- Create Organization table
CREATE TABLE Organization (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Location table
CREATE TABLE Location (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES Organization(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    business_hours JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Room table
CREATE TABLE Room (
    id SERIAL PRIMARY KEY,
    location_id INTEGER REFERENCES Location(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    capacity INTEGER,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Profile table
CREATE TABLE Profile (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES Organization(id) ON DELETE CASCADE,
    role VARCHAR(255) NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Staff table
CREATE TABLE Staff (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES Organization(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Availability table
CREATE TABLE Availability (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES Organization(id) ON DELETE CASCADE,
    staff_id INTEGER REFERENCES Staff(id) ON DELETE CASCADE,
    day_of_week VARCHAR(10) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Contact table
CREATE TABLE Contact (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES Organization(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Service table
CREATE TABLE Service (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES Organization(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create Request table
CREATE TABLE Request (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES Organization(id) ON DELETE CASCADE,
    location_id INTEGER REFERENCES Location(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES Service(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Completed', 'Waiting', 'Closed')),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    documents JSONB
);

-- Create RequestContact table
CREATE TABLE RequestContact (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES Request(id) ON DELETE CASCADE,
    contact_id INTEGER REFERENCES Contact(id) ON DELETE CASCADE
);

-- Create RequestContactAvailability table
CREATE TABLE RequestContactAvailability (
    id SERIAL PRIMARY KEY,
    requestcontact_id INTEGER REFERENCES RequestContact(id) ON DELETE CASCADE,
    day_of_week VARCHAR(10) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    CONSTRAINT chk_time_order CHECK (start_time < end_time)
);

-- Create CaseFile table
CREATE TABLE CaseFile (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES Organization(id) ON DELETE CASCADE,
    request_id INTEGER,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    documents JSONB
);

-- Create CaseFileContact table
CREATE TABLE CaseFileContact (
    id SERIAL PRIMARY KEY,
    casefile_id INTEGER NOT NULL REFERENCES CaseFile(id) ON DELETE CASCADE,
    contact_id INTEGER NOT NULL REFERENCES Contact(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    CHECK (status IN ('pending', 'inprogress', 'complete')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    documents JSONB
);

-- Create Appointment table
CREATE TABLE Appointment (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES Organization(id) ON DELETE CASCADE,
    casefile_id INTEGER NOT NULL REFERENCES CaseFile(id) ON DELETE CASCADE,
    service_id INTEGER REFERENCES Service(id) ON DELETE SET NULL,
    location_id INTEGER REFERENCES Location(id) ON DELETE SET NULL,
    room_id INTEGER REFERENCES Room(id) ON DELETE SET NULL,
    staff_id INTEGER REFERENCES Staff(id) ON DELETE SET NULL,
    date DATE,
    time_start TIME,
    time_end TIME,
    state VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Report table
CREATE TABLE Report (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER NOT NULL REFERENCES Organization(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    content TEXT,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Note table
CREATE TABLE Note (
    id SERIAL PRIMARY KEY,
    organization_id INTEGER REFERENCES Organization(id) ON DELETE CASCADE,
    appointment_id INTEGER REFERENCES Appointment(id) ON DELETE CASCADE,
    casefile_id INTEGER REFERENCES CaseFile(id) ON DELETE CASCADE,  
    report_id INTEGER REFERENCES Report(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    content TEXT
);
