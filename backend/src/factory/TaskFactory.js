// factory/TaskFactory.js

class TaskFactory {
  /**
   * Creates a validated task object ready for database insertion.
   * @param {Object} data - Raw task input from the request body.
   * @param {string} userId - Authenticated user's ID from JWT.
   * @returns {Object} - Validated and structured task data.
   */
  static createTask(data, userId) {
    const { title, description, priority, dueDate } = data;

    if (!title || title.trim().length === 0) {
      const err = new Error('Validation Error: Task title is required.');
      err.statusCode = 400;
      throw err;
    }

    const validPriorities = ['LOW', 'MEDIUM', 'HIGH'];
    const resolvedPriority = priority && validPriorities.includes(priority.toUpperCase())
      ? priority.toUpperCase()
      : 'MEDIUM';

    return {
      title:       title.trim(),
      description: description ? description.trim() : null,
      status:      'TODO',         // Default status on creation
      priority:    resolvedPriority,
      dueDate:     dueDate ? new Date(dueDate) : null,
      userId,
    };
  }

  /**
   * Extension: creates a recurring task without modifying createTask (OCP).
   * @param {Object} data
   * @param {string} userId
   * @param {string} interval - e.g. 'daily', 'weekly'
   * @returns {Object}
   */
  static createRecurringTask(data, userId, interval) {
    const base = TaskFactory.createTask(data, userId);
    return { ...base, isRecurring: true, interval };
  }
}

module.exports = TaskFactory;
