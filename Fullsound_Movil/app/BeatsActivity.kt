package com.fullsound.app

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView

class BeatsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_beats)
        val recyclerView = findViewById<RecyclerView>(R.id.recyclerViewBeats)
        recyclerView.layoutManager = LinearLayoutManager(this)
        // recyclerView.adapter = BeatAdapter(StorageUtils.getBeats(this), this)

        findViewById<Button>(R.id.btnCarrito).setOnClickListener {
            startActivity(Intent(this, CarritoActivity::class.java))
        }
        findViewById<Button>(R.id.btnAdmin).setOnClickListener {
            startActivity(Intent(this, AdminActivity::class.java))
        }
    }
    }
}
