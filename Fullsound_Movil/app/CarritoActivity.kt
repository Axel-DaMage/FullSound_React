package com.fullsound.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class CarritoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_carrito)

        findViewById<Button>(R.id.btnVolverBeats).setOnClickListener {
            startActivity(Intent(this, BeatsActivity::class.java))
        }
        findViewById<Button>(R.id.btnVolverMain).setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }
    }
    }
}
