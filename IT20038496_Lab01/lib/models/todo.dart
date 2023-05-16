class Todo {
  late String id;
  late String taskname;
  late bool iscomplete;

  Todo({
    required this.id,
    required this.taskname,
    this.iscomplete = false,
  });

  static List<Todo> todoList() {
    return [
      Todo(id: '01',taskname: 'Excercise', iscomplete: false),
      Todo(id: '02',taskname: 'Check Emails', iscomplete: false),
      Todo(id: '03',taskname: 'Submit the Lab', iscomplete: false),
      Todo(id: '04',taskname: 'Study CTSE', iscomplete: true),
      Todo(id: '05',taskname: 'Find Research Papers', iscomplete: false),
      Todo(id: '06',taskname: 'Wash dishes', iscomplete: true),

    ];
  }
}
