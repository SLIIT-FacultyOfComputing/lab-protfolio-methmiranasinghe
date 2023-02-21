import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:todo_list_lab1/constants/colors.dart';

import '../models/todo.dart';

class ToDoItem extends StatelessWidget {
  final Todo todo;
  final onToDoChanged;
  final onDeleteItem;

  const ToDoItem({Key? key, required this.todo, required this.onToDoChanged, required this.onDeleteItem}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: const EdgeInsets.only(bottom: 20),
        child: ListTile(
          onTap: () {
            onToDoChanged(todo);
          },
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          contentPadding: const EdgeInsets.symmetric(horizontal: 20, vertical: 5),
          tileColor: Colors.white,
          leading: Icon(todo.iscomplete ? Icons.check_box : Icons.check_box_outline_blank, color: todoBlue),
          title: Text(
            todo.taskname!,
            style: TextStyle(
              fontSize: 16,
              color: todoBlue,
              decoration: todo.iscomplete ? TextDecoration.lineThrough : null,
            ),
          ),
          trailing: Container(
            padding: const EdgeInsets.all(0),
            margin: const EdgeInsets.symmetric(vertical: 12),
            height: 35,
            width: 35,
            decoration: BoxDecoration(color: todoRed, borderRadius: BorderRadius.circular(5)),
            child: IconButton(
              color: Colors.white,
              iconSize: 18,
              icon: const Icon(Icons.delete),
              onPressed: () {
                onDeleteItem(todo.id);
              },
            ),
          ),
        ));
  }
}
