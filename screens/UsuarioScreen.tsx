import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ref, set, onValue, update, remove } from "firebase/database";
import { db } from '../config/config';
import { StatusBar } from 'expo-status-bar';

export default function UsuarioScreen() {
    const [cedula, setCedula] = useState('');
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [comentario, setComentarios] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [modoEdicion, setModoEdicion] = useState(false);

    //--GUARDAR--//
    function guardarUsiario(cedula: string, nombre: string, correo: string, comentario: string) {
        set(ref(db, 'usuarios/' + cedula), {
            nombre: nombre,
            email: correo,
            comments: comentario
        });
        Alert.alert('Mensaje', 'Guardado con éxito');
        limpiarFormulario();
    }

    //--EDITAR--//
    function actualizarUsuario(cedula: string, nombre: string, correo: string, comentario: string) {
        update(ref(db, 'usuarios/' + cedula), {
            nombre: nombre,
            email: correo,
            comments: comentario
        });
        Alert.alert('Mensaje', 'Actualizado con éxito');
        limpiarFormulario();
        setModoEdicion(false);
    }

    function limpiarFormulario() {
        setCedula('');
        setNombre('');
        setCorreo('');
        setComentarios('');
    }

    //--LEER---//
    useEffect(() => {
        const starCountRef = ref(db, 'usuarios/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const datatemp: any = Object.keys(data).map((key) => ({
                key, ...data[key]
            }));
            setUsuarios(datatemp);
        });
    }, []);

    function editar2(item: any) {
        setCedula(item.key);
        setNombre(item.nombre);
        setCorreo(item.email);
        setComentarios(item.comments);
        setModoEdicion(true);
    }

    //--ELIMINAR--//
    function eliminar(id: string) {
        remove(ref(db, 'usuarios/' + id));
        Alert.alert('Mensaje', 'Eliminado con éxito');
        if (cedula === id) {
            limpiarFormulario();
            setModoEdicion(false);
        }
    }

    type Usuario = {
        nombre: string,
        key: string
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>Usuarios</Text>
            <TextInput style={styles.text}
                onChangeText={(texto) => setCedula(texto)}
                value={cedula || ''}
                keyboardType='numeric'
                placeholder='Ingrese cedula'
            />
            <TextInput style={styles.text}
                onChangeText={(texto) => setNombre(texto)}
                value={nombre || ''}
                placeholder='Ingrese nombre'
            />
            <TextInput style={styles.text}
                onChangeText={(texto) => setCorreo(texto)}
                value={correo || ''}
                keyboardType='email-address'
                placeholder='Ingrese correo'
            />
            <TextInput style={styles.text}
                onChangeText={(texto) => setComentarios(texto)}
                value={comentario || ''}
                placeholder='Ingrese comentario'
            />
            <Button
                title={modoEdicion ? 'Actualizar' : 'Guardar'}
                color={modoEdicion ? '#7ABA78' : undefined}
                onPress={() => modoEdicion ? actualizarUsuario(cedula, nombre, correo, comentario) : guardarUsiario(cedula, nombre, correo, comentario)}
            />

            <FlatList
                data={usuarios}
                renderItem={({ item }: { item: Usuario }) =>
                    <View>
                        <Text> {item.nombre}</Text>
                        <Text> {item.key}</Text>
                        <View style={styles.buttonContainer}>
                            <View style={styles.buttonWrapper}>
                                <Button title='Editar' color={'#7ABA78'} onPress={() => editar2(item)} />
                            </View>
                            <View style={styles.buttonWrapper}>
                                <Button title='Eliminar' color={'#A91D3A'} onPress={() => eliminar(item.key)} />
                            </View>
                        </View>
                    </View>
                } />

            <StatusBar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7AB2B2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        borderWidth: 1,
        borderColor: '#4D869C',
        width: 200,
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#CDE8E5',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3,
        marginTop: 10,
        color: '#7AB2B2',
    },
    text1: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        color: '#4D869C',
    },
    text5: {
        color: '#4D869C',
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    buttonWrapper: {
        marginRight: 5,
    }
});
