package com.fullsound.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class LoginActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        findViewById<Button>(R.id.btnVolverMain).setOnClickListener {
            startActivity(Intent(this, MainActivity::class.java))
        }
    }
    }
}
