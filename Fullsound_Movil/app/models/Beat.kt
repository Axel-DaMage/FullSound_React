package com.fullsound.app.models

data class Beat(
    val id: Int,
    val titulo: String,
    val artista: String,
    val genero: String,
    val precio: Int,
    val descripcion: String,
    val imagen: String,
    val audio: String
)
