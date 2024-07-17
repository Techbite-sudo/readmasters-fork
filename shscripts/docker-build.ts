import { $ } from "bun";

function getTimeBasedTag() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}-${date.getTime()}`
}
const imageName = "wingi-internal-nextjs";
const tag = getTimeBasedTag();

await $`docker build -t ${imageName}:${tag} .`;

await $`docker tag ${imageName}:${tag} 661615091860.dkr.ecr.eu-west-2.amazonaws.com/wingi-op:${tag}`;

await $`docker push 661615091860.dkr.ecr.eu-west-2.amazonaws.com/wingi-op:${tag}`;
