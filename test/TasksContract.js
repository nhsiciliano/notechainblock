const TasksContract = artifacts.require("TasksContract")

contract("TasksContract", () => {

    before(async () => {
        this.myTask = await TasksContract.deployed()
    })

    it("migrate deployed successfully", async () => {
        const address = this.myTask.address;
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })

    it("get Tasks List", async () => {
        const counter = await this.myTask.taskCounter();
        const task = await this.myTask.tasks(counter);
        assert.equal(task.id.toNumber(), counter);

    })

    it("task created successfully", async () => {
        const result = await this.myTask.createTask("some task", "description two");
        const taskEvent = result.logs[0].args;
        const taskCounter = await this.myTask.taskCounter();

        assert.equal(taskCounter, 2);
        assert.equal(taskEvent.id.toNumber(), 2);
        assert.equal(taskEvent.title, "some task");
        assert.equal(taskEvent.description, "description two");
        assert.equal(taskEvent.done, false);

    })

    it("task toggle done", async () => {
        const result = await this.myTask.toggleDone(1);
        const taskEvent = result.logs[0].args;
        const task = await this.myTask.tasks(1);

        assert.equal(task.done, true);
        assert.equal(taskEvent.done, true);
        assert.equal(taskEvent.id, 1);

    })

})

// 3:00