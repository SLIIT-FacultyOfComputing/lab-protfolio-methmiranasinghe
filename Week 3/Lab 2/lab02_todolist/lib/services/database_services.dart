import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import '../model/todo.dart';

class DatabaseService {
  CollectionReference todosCollection = FirebaseFirestore.instance.collection("Todos");

  Future createNewTodo(String title) async {
    return await todosCollection.add({"title": title, "isComplete": false});
  }

  Future completeTask(uid) async {
    await todosCollection.doc(uid).update({"isComplete": true});
  }

  Future removeTodo(uid) async {
    await todosCollection.doc(uid).delete();
  }

  List<Todo> todoFromFirestore(QuerySnapshot? snapshot) {
    if (snapshot != null) {
      return snapshot.docs.map((e) {
        return Todo(isComplete: (e.data() as dynamic)["isComplete"], title: (e.data() as dynamic)["title"], uid: e.id);
      }).toList();
    } else {
      return List.empty();
    }
  }

  Stream<List<Todo>>? listTodos() {
    return todosCollection.snapshots().map(todoFromFirestore);
  }
}
