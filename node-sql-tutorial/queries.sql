-- use the database
USE master;
-- non-transact command for sql server apps to submit transactions
GO

CREATE DATABASE calendar; -- change this to whatever database name you desire
GO

USE calendar;

-- Dropping events table...
DROP TABLE IF EXISTS events;

-- Create events table...
CREATE TABLE events (
   -- clustered key means that there's some order in a way the rows are placed in
   -- a table which allows for faster row retreival 
   -- values generated by the database: identity(seed, increment)
   id int IDENTITY(1, 1) PRIMARY KEY CLUSTERED NOT NULL
   -- NOT NULL rows mean that NULL can't be a value here
   , userId nvarchar(50) NOT NULL
   , title nvarchar(200) NOT NULL
   , description nvarchar(1000) NULL
   , startDate date NOT NULL
   , startTime time(0) NULL
   , endDate date NULL
   , endTime time(0) NULL
   -- another non unique non clusted index
   , INDEX idx_events_userId ( userId )
);

GO