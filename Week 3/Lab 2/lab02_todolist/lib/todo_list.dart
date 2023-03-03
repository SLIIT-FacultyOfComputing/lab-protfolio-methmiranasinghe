import 'package:flutter/material.dart';
import 'package:lab02_todolist/loading.dart';
import 'package:lab02_todolist/services/database_services.dart';

import 'model/todo.dart';

class TodoList extends StatefulWidget {
  const TodoList({super.key});
  @override
  _TodoListState createState() => _TodoListState();
}

class _TodoListState extends State<TodoList> {
  bool isComplete = false;
  TextEditingController todoTitleController = TextEditingController();
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
          child: StreamBuilder<List<Todo>>(
              stream: DatabaseService().listTodos(),
              builder: (context, snapshot) {
                if (!snapshot.hasData) {
                  return Loading();
                }
                List<Todo>? todos = snapshot.data;
                return Padding(
                  padding: EdgeInsets.all(25),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "All Todos",
                        style: TextStyle(fontSize: 30, color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                      Divider(color: Colors.grey[600]),
                      SizedBox(height: 20),
                      ListView.separated(
                          separatorBuilder: (context, index) => Divider(
                                color: Colors.grey[800],
                              ),
                          shrinkWrap: true,
                          itemCount: todos!.length,
                          itemBuilder: (context, index) {
                            return Dismissible(
                              key: Key(
                                todos[index].title,
                              ),
                              background: Container(
                                padding: EdgeInsets.only(left: 20),
                                alignment: Alignment.centerLeft,
                                child: Icon(Icons.delete),
                                color: Colors.red,
                              ),
                              onDismissed: (direction) async {
                                await DatabaseService().removeTodo(todos[index].uid);
                              },
                              child: ListTile(
                                onTap: () {
                                  DatabaseService().completeTask(todos[index].uid);
                                },
                                leading: Container(
                                    padding: EdgeInsets.all(2),
                                    height: 30,
                                    width: 30,
                                    decoration: BoxDecoration(color: Theme.of(context).primaryColor, shape: BoxShape.circle),
                                    child: todos[index].isComplete!
                                        ? Icon(
                                            Icons.check,
                                            color: Colors.white,
                                          )
                                        : Container()),
                                title: Text(
                                  todos[index].title,
                                  style: TextStyle(fontSize: 20, color: Colors.grey[200], fontWeight: FontWeight.w600),
                                ),
                              ),
                            );
                          }),
                    ],
                  ),
                );
              })),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton(
        child: Icon(Icons.add),
        backgroundColor: Theme.of(context).primaryColor,
        onPressed: () {
          showDialog(
            context: context,
            builder: (context) => SimpleDialog(
              contentPadding: EdgeInsets.symmetric(horizontal: 25, vertical: 20),
              backgroundColor: Colors.grey[700],
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              title: Row(
                children: [
                  Text(
                    "Add Todo",
                    style: TextStyle(fontSize: 20, color: Colors.white),
                  ),
                  Spacer(),
                  IconButton(
                      icon: Icon(
                        Icons.cancel,
                        color: Colors.grey,
                        size: 30,
                      ),
                      onPressed: () => Navigator.pop(context))
                ],
              ),
              children: [
                Divider(),
                TextFormField(
                  controller: todoTitleController,
                  style: TextStyle(
                    fontSize: 18,
                    height: 1.5,
                    color: Colors.white,
                  ),
                  autofocus: true,
                  decoration: InputDecoration(
                    hintText: "eg. exam",
                    hintStyle: TextStyle(color: Colors.white70),
                    border: InputBorder.none,
                  ),
                ),
                SizedBox(height: 20),
                SizedBox(
                    width: MediaQuery.of(context).size.width,
                    height: 50,
                    child: TextButton(
                      style: TextButton.styleFrom(
                          primary: Colors.white, // Text Color
                          backgroundColor: Colors.pink),
                      child: Text("Add"),
                      onPressed: () async {
                        if (todoTitleController.text.isNotEmpty) {
                          await DatabaseService().createNewTodo(todoTitleController.text.trim());
                          Navigator.pop(context);
                        }
                      },
                    )),
              ],
            ),
          );
        },
      ),
    );
  }
}
