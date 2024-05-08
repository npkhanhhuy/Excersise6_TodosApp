import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Button, TextInput } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'

const TodoApp = () => {
    const [newToDo,setNewToDo] = useState("")
    const [toDos, setToDos] = useState("")
    const cToDos = firestore().collection("ToDos")
    const addNewToDo = ()=>{
        cToDos.add({
            title:newToDo,
            complete: false
        })
        .then(()=>Alert.alert("Thêm dữ liệu"))
        .catch(e=>Alert.alert(e.message))
    }
    useEffect(()=>{
        cToDos.onSnapshot(
            listToDos=>{
                var result = []
                listToDos.forEach(
                    todo => {
                        const {title, complete} = todo.data()
                        result.push({
                            id:todo.id,
                            title,
                            complete
                        })
                    }
                )
                setToDos(result)
            }
        )
    },[])
    const updateToDo=({id, complete})=>{
        cToDos.doc(id)
        .update({
            complete: !complete
        })
        .then(()=>Alert.alert("Đã cập nhật"))
    }
    const renderItem = ({item})=>{
        const {id,title,complete}=item
        return(
            <Button icon={(complete)? "home":"star"}
                onPress={()=>updateToDo(item)}
            >
                {title}
            </Button>
        )
    }
    return (
    <View style={{flex:1}}>
        <Appbar style={{backgroundColor:"aqua"}}>
            <Appbar.Content title="To Do Apps" style={{alignItems:"center"}}/>
        </Appbar>
        <FlatList
            data={toDos}
            keyExtractor={item=>item.id}
            renderItem={renderItem}
        />
        <TextInput label="Thêm ToDo"
        value={newToDo} 
        onChangeText={setNewToDo} 
        /> 
        <Button
        onPress={addNewToDo}
        >
            Add TODO
        </Button>
    </View>
    )
}

export default TodoApp

const styles = StyleSheet.create({})