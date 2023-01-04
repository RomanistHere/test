# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

1. create new table: AgentIds, store there facilityId, agentId, customId
2. create new function `editCustomAgentId`, it should take three params: facilityId, agentId (get from app) and customId (user input) -> verify params (trim and sanitize user input), verify that agent is still "active", verify that facility has access to this feature (sounds like a paid option) -> if everything's good, make a new record in db
3. create new function `getAgentId` with two params: facilityId and agentId. It should search for a record in AgentIds table, and, if succeeded, return customId, otherwise agentId
4. in `getShiftsByFacility` add additional step after we got metadata, run `getAgentId` for every agent and edit metadata with custom agent id if needed before calling `generateReport`
5. add in app text input to make it available for a customer to assign custom ids to agents. We should display full agent name or another unique identifier that customer will clearly understand, probably with number of shifts run for him. Also, since it might be a paid feature, check for that and display some sort of notification about it if current plan doesn't include it. For example: "you can edit only 1 agent with your free plan". Ideally, collaborate with designer on that.