import { Nullable } from "@/lib/utils/types";
import { ChangeEvent, useState } from "react";

const UploadForm: React.FC = () => {
	const [file, setFile] = useState<Nullable<File>>(null);
	const [uploading, setUploading] = useState(false);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files;
		if (files) {
			setFile(files[0]);
		}
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (!file) return;

		setUploading(true);
		const formData = new FormData();
		formData.append("file", file);

		try {
			const response = await fetch("/api/image-upload", {
				method: "POST",
				body: formData,
			});

			const data = await response.json();
			console.log(data.status);
			setUploading(false);
		} catch (error) {
			console.log(error);
			setUploading(false);
		}
	};

	return (
		<div>
			<input type="file" name="companyLogoUrl" onChange={handleFileChange} />
			<button type="submit" onClick={handleSubmit} disabled={!file || uploading}>
				{uploading ? "Uploading..." : "Upload"}
			</button>
		</div>
	);
};

export default UploadForm;
