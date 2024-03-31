const express = require('express');
const { Prodia } = require('prodia.js');
const app = express();
const prodia = new Prodia("7b16d9d8-f6c7-4ad7-b43b-fd925eda9b19"); // Your API key here

app.get('/face-swap', async (req, res) => {
    const { first, second } = req.query;

    const generate = await prodia.faceSwap({
        sourceUrl: first,
        targetUrl: second,
    });

    while (generate.status !== "succeeded" && generate.status !== "failed") {
        await new Promise((resolve) => setTimeout(resolve, 250));

        const job = await prodia.getJob(generate.job);

        if (job.status === "succeeded") {
            res.json(job);
            break;
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
