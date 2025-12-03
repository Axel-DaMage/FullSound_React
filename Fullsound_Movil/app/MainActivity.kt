package com.fullsound.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import android.content.Intent

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        findViewById<Button>(R.id.btnBeats).setOnClickListener {
            startActivity(Intent(this, BeatsActivity::class.java))
        }
        findViewById<Button>(R.id.btnCarrito).setOnClickListener {
            startActivity(Intent(this, CarritoActivity::class.java))
        }
        findViewById<Button>(R.id.btnAdmin).setOnClickListener {
            startActivity(Intent(this, AdminActivity::class.java))
        }
        findViewById<Button>(R.id.btnCreditos).setOnClickListener {
            startActivity(Intent(this, CreditosActivity::class.java))
        }
        findViewById<Button>(R.id.btnLogin).setOnClickListener {
            startActivity(Intent(this, LoginActivity::class.java))
        }
        findViewById<Button>(R.id.btnRegistro).setOnClickListener {
            startActivity(Intent(this, RegistroActivity::class.java))
        }
        findViewById<Button>(R.id.btnTerminos).setOnClickListener {
            startActivity(Intent(this, TerminosActivity::class.java))
        }
    }
    }
}
