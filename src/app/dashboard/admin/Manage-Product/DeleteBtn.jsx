// app/components/DeleteModal.jsx   (যেকোনো জায়গায় রাখতে পারো)
"use client";

import { useState } from "react";
import { Trash2, X, AlertTriangle } from "lucide-react";
import { toast } from "react-hot-toast";

export default function DeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Delete this item?", 
  message = "This action cannot be undone.",
  itemName = "" 
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();        // এখানে তোমার delete logic চলবে
      toast.success("Deleted successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-neutral-900 border border-white/10 rounded-2xl w-full max-w-sm p-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isDeleting}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center gap-4 mt-2">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
            <AlertTriangle size={28} className="text-red-400" />
          </div>

          <h3 className="text-xl font-semibold text-white">{title}</h3>
          
          {itemName && (
            <p className="text-neutral-300 font-medium">"{itemName}"</p>
          )}

          <p className="text-neutral-400 text-sm">{message}</p>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-xl border border-white/10 hover:bg-white/5 text-white font-medium transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium transition disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
            {!isDeleting && <Trash2 size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}