import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import fetch from 'node-fetch';
import { randomUUID } from 'crypto'


const presentationRequests: Map<string, any> = new Map();

const offers: Map<string, string> = new Map();


const allowedIssuers = ['did:web:ssi.eecc.de', 'did:web:eecc.de', 'did:web:demo.ssi.eecc.de']

export class RequestRoutes {

    request = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        // create challenge and return OID4VP url
        const challenge = req.params.challenge || randomUUID()


        if (req.params.challenge) {

            const presentationRequest = presentationRequests.get(challenge)

            if (presentationRequest) return res.status(StatusCodes.OK).json(presentationRequest)

            return res.sendStatus(StatusCodes.NOT_FOUND)
        }

        let fields = [{
            "path": [
                "$.type"
            ],
            "filter": {
                "type": "array",
                "contains": {
                    "type": "string",
                    "const": "EECCAccessCredential"
                }
            }
        }]

        /*if (req.query.productid) {
            fields.push({
                "path": [
                    "$.credentialSubject.product_id"
                ],
                "filter": {
                    "type": "string",
                    // @ts-ignore
                    "const": req.query.productid
                }
            })
        }*/

        const presentationRequest = {
            "nonce": challenge,
            "response_mode": "direct_post",
            "response_type": "vp_token",
            "client_id": "https://sccon.ssi.eecc.de/api/request/presentation/" + challenge,
            "response_uri": "https://sccon.ssi.eecc.de/api/request/presentation/" + challenge,
            "presentation_definition": {
                "id": "eecc_viewer_request_" + challenge,
                "input_descriptors": [
                    {
                        "id": "eecc_viewer_request_" + challenge + "_EECCAccessCredential",
                        "format": {
                            "ldp_vc": {
                                "proof_type": [
                                    "Ed25519Signature2018",
                                    "Ed25519Signature2020"
                                ]
                            }
                        },
                        "constraints": {
                            "fields": fields
                        }
                    }
                ]
            }
        }



        presentationRequests.set(challenge, presentationRequest)


        const requestURL = 'openid-presentation-request://?client_id='
            + encodeURI('https://sccon.ssi.eecc.de/api/request/presentation/' + challenge)
            + '&request_uri='
            + encodeURI('https://sccon.ssi.eecc.de/api/request/presentation/' + challenge)


        return res.status(StatusCodes.CREATED).send(requestURL);

    }


    getOffer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const offer = offers.get(req.params.challenge)

        if (!offer) return res.sendStatus(StatusCodes.NOT_FOUND)

        return res.status(StatusCodes.OK).send(offer);

    }

    present = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

        const presentation = typeof req.body.vp_token === 'string' ? JSON.parse(req.body.vp_token) : req.body.vp_token;

        // check validity
        const verifierResult = await fetch('https://ssi.eecc.de/api/verifier?challenge=' + req.params.challenge, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([presentation])
        });

        if (!(await verifierResult.json() as any)[0].verified) return res.sendStatus(StatusCodes.UNAUTHORIZED);

        const credentials = Array.isArray(presentation.verifiableCredential) ? presentation.verifiableCredential : [presentation.verifiableCredential]

        // check credential type
        if (!credentials.every((c: any) => c.type.includes('EECCAccessCredential'))) return res.status(StatusCodes.UNAUTHORIZED).send('Only EECCAccessCredentials are allowed!')

        const proofs = Array.isArray(presentation.proof) ? presentation.proof : [presentation.proof]
        const presenter = proofs.map((p: any) => p.verificationMethod.split('#')[0])

        // semantic holder binding check
        if (!credentials.every((c: any) => presenter.includes(c.credentialSubject.id))) return res.status(StatusCodes.UNAUTHORIZED).send('Holder binding failed! Use the proper identity to present your credentials!')

        // check issuer
        const issuers = credentials.map((c: any) => c.issuer.id || c.issuer)

        if (!issuers.every((iss: string) => allowedIssuers.includes(iss))) return res.status(StatusCodes.UNAUTHORIZED).send('Access credential issued by unauthorized issuer!')

        // TODO request offer
        const offer = 'testoffer';

        offers.set(req.params.challenge, offer)

        presentationRequests.delete(req.params.challenge)

        return res.sendStatus(StatusCodes.OK)

    }

}