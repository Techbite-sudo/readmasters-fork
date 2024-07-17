import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
	region: process.env._AWS_REGION,
	credentials: {
		accessKeyId: process.env._AWS_ACCESS_KEY_ID ?? "",
		secretAccessKey: process.env._AWS_SECRET_ACCESS_KEY ?? "",
	},
});

async function uploadFileToS3(file: Buffer, fileName: any) {
	const fileBuffer = file;
	// const modifiedFileName = fileName.replace(/ /g, "+");
	const timestamp = Date.now();
	const modifiedFileName = `${timestamp}${fileName.substring(fileName.lastIndexOf("."))}`;
	console.log(modifiedFileName);

	const params = {
		Bucket: process.env._AWS_BUCKET_NAME,
		Key: `${modifiedFileName}`,
		Body: fileBuffer,
		ContentType: "image/jpg",
	};

	const command = new PutObjectCommand(params);
	await s3Client.send(command);
	const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${modifiedFileName}`;
	return fileUrl;
}

export async function POST(request: Request) {
	try {
		const formData = await request.formData();
		const file = formData.get("file");

		if (!(file instanceof File)) {
			return NextResponse.json({ error: "File is required." }, { status: 400 });
		}

		const buffer = Buffer.from(await file.arrayBuffer());
		const fileName = await uploadFileToS3(buffer, file.name);
		console.log("URL:", fileName);
		return NextResponse.json({ success: true, fileName });
	} catch (error) {
		return NextResponse.json({ error });
	}
}
