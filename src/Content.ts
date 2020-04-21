import fs from "fs";
import http from "http";
import url from "url";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>LNKO</title>");
        res.write("</head>");
        res.write("<body><form><pre>");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const params = url.parse(req.url as string, true).query;

        // Kezd a kódolást innen -->

        res.write("LNKO meghatározása\n\n\n");

        // Tetszőleges html teg-ek és attribútumok beépítése:
        res.write("Kivonásos módszerrel\n");

        let a: number = parseInt(params.a as string);
        if (isNaN(a)) a = 18;
        res.write(`a=: <input type='number' name='a' value=${a} style='width:3em;' onChange='this.form.submit();'>\n`);

        let b: number = parseInt(params.b as string);
        if (isNaN(b)) b = 18;
        res.write(`b=: <input type='number' name='b' value=${b} style='width:3em;' onChange='this.form.submit();'>\n\n`);

        let segedA: number = a;
        let segedB: number = b;

        while (segedA != segedB) {
            if (segedA > segedB) {
                segedA = segedA - segedB;
            } else {
                segedB = segedB - segedA;
            }
        }
        res.write(`${a} és ${b} legnagyobb közözs osztója : ${segedA}\n\n`);

        res.write("Euklidesz algoritmusával\n\n");

        segedA = a;
        segedB = b;

        let maradek: number; // deklaráció név + típus

        do {
            maradek = segedA % segedB; // maradékos osztás
            segedA = segedB; // előző maradék
            segedB = maradek; // új maradék
        } while (maradek != 0);

        res.write(`${a} és ${b} legnagyobb közös osztója: ${segedA}\n\n`);

        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
