package com.fullsound.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class ProductoActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_producto)

        findViewById<Button>(R.id.btnIrCarrito).setOnClickListener {
            startActivity(Intent(this, CarritoActivity::class.java))
        }
        findViewById<Button>(R.id.btnVolverBeats).setOnClickListener {
            startActivity(Intent(this, BeatsActivity::class.java))
        }
    }
    }
}
