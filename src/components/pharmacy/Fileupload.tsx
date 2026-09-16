"use client";

import { useRef, useState } from "react";
import { UploadCloud, FileText, Trash2 } from "lucide-react";
import { COLORS } from "@/constants/colors";

interface FileUploadProps {
    label?: string;
    hint?: string;
    accept?: string;
    value?: { name: string; size?: string; uploadedOn?: string } | null;
    onChange: (file: File | null) => void;
}

export default function FileUpload({
                                       label,
                                       hint = "PDF, PNG, JPG (Max. 5MB)",
                                       accept = ".pdf,.png,.jpg,.jpeg",
                                       value,
                                       onChange,
                                   }: FileUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);

    const handleFiles = (files: FileList | null) => {
        if (files && files[0]) onChange(files[0]);
    };

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <span className="text-sm font-medium" style={{ color: COLORS.navy }}>
                    {label}
                </span>
            )}
            <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleFiles(e.dataTransfer.files);
                }}
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-8 text-center transition"
                style={{
                    borderColor: dragOver ? COLORS.blue : "#E2E8F0",
                    backgroundColor: dragOver ? `${COLORS.blue}0d` : "#FFFFFF",
                }}
            >
                <UploadCloud size={24} style={{ color: COLORS.blue }} />
                <p className="text-sm" style={{ color: COLORS.navy }}>
                    <span style={{ color: COLORS.blue }} className="font-medium">
                        Click to upload
                    </span>{" "}
                    or drag and drop
                </p>
                <p className="text-xs" style={{ color: COLORS.gray }}>
                    {hint}
                </p>
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>
            {value && (
                <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
                    <div className="flex items-center gap-2">
                        <FileText size={16} style={{ color: "#DC2626" }} />
                        <div className="flex flex-col">
                            <span className="text-sm font-medium" style={{ color: COLORS.blue }}>
                                {value.name}
                            </span>
                            {(value.size || value.uploadedOn) && (
                                <span className="text-xs" style={{ color: COLORS.gray }}>
                                    {value.size}
                                    {value.size && value.uploadedOn ? " · " : ""}
                                    {value.uploadedOn ? `Uploaded ${value.uploadedOn}` : ""}
                                </span>
                            )}
                        </div>
                    </div>
                    <button type="button" onClick={() => onChange(null)} className="text-slate-400 hover:text-red-500">
                        <Trash2 size={14} />
                    </button>
                </div>
            )}
        </div>
    );
}