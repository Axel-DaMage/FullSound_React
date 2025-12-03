package com.fullsound.app.adapters

import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.fullsound.app.models.Beat

class BeatAdapter(
    private val beats: List<Beat>,
    private val parentContext: android.content.Context
) : RecyclerView.Adapter<BeatAdapter.BeatViewHolder>() {

    class BeatViewHolder(view: View) : RecyclerView.ViewHolder(view) {
        val titulo: TextView = view.findViewById(R.id.titulo)
        // Otros campos
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BeatViewHolder {
        val view = LayoutInflater.from(parent.context).inflate(R.layout.item_beat, parent, false)
        return BeatViewHolder(view)
    }

    override fun onBindViewHolder(holder: BeatViewHolder, position: Int) {
        val beat = beats[position]
        holder.titulo.text = beat.titulo
        // Otros campos
        holder.itemView.setOnClickListener {
            val intent = android.content.Intent(parentContext, com.fullsound.app.ProductoActivity::class.java)
            intent.putExtra("beat_id", beat.id)
            parentContext.startActivity(intent)
        }
    }

    override fun getItemCount() = beats.size
}
