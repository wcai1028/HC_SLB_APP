import { algoMap } from './storage'
export class CertInfo {

    pemToBinAb = (pem: string) => {
        const b64 = pem.replace(/(-----(BEGIN|END) CERTIFICATE-----|[\n\r])/g, '')
        const buf = Buffer.from(b64, 'base64')
        const ab = new Uint8Array(buf).buffer
        return ab
    }

    toHexCodes = (inputBuffer) => {
        let result = ''
        const intBuffer = new Uint8Array(inputBuffer)
        for (let i = 0; i < intBuffer.length; i++) {
            const str = intBuffer[i].toString(16)
            if (str.length === 1 && str === '0') {
                continue
            }
            result += str
            if (i < intBuffer.length - 1) {
                result += ':'
            }
        }
        return result
    }

    getCertInfo = (pem: string) => {
        const ab = this.pemToBinAb(pem)
        const merge = require('node.extend')

        const common = require('asn1js/org/pkijs/common')
        const asn1jsLib = require('asn1js')
        const pkijsLib = require('pkijs')
        const x509schemaLib = require('pkijs/org/pkijs/x509_schema')
        const asn1js = merge(true, asn1jsLib, common)

        const x509schema = merge(true, x509schemaLib, asn1js)

        const pkijsMerge = merge(true, pkijsLib, asn1js)
        const pkijs = merge(true, pkijsMerge, x509schema)

        const asn1 = pkijs.org.pkijs.fromBER(ab)
        const certSimpl = new pkijs.org.pkijs.simpl.CERT({ schema: asn1.result })
        return certSimpl
    }
    getBasicInfo = (pem: string) => {
        const c = this.getCertInfo(pem)
        const domains = []
        if (c.extensions) {
            c.extensions.forEach((ext) => {
                if (ext.parsedValue && ext.parsedValue.altNames) {
                    ext.parsedValue.altNames.forEach((alt) => {
                        domains.push(alt.Name)
                    })
                }
            })
        }
        const sub = c.subject.types_and_values[0].value.value_block.value || null

        return {
            subject: sub
            , altnames: domains
            , _issuedAt: c.notBefore.value
            , _expiresAt: c.notAfter.value
            , issuedAt: new Date(c.notBefore.value).valueOf()
            , expiresAt: new Date(c.notAfter.value).valueOf()
        }
    }

    getCertString = (c: IObject) => {
        console.log(c)
        if (c) {
            let serialNumber = ''
            if (c.serialNumber.value_block.is_hex_only === true) {
                serialNumber = this.toHexCodes(c.serialNumber.value_block.value_hex)
            } else {
                serialNumber = c.serialNumber.value_block.value_dec
            }
            console.log(serialNumber)
            return {
                serialNum: serialNumber,
                sigAlgo: algoMap[c.signatureAlgorithm.algorithm_id],
                issuerC: 'C=' + c.issuer.types_and_values[0].value.value_block.value,
                issuerCN: 'CN=' + c.issuer.types_and_values[1].value.value_block.value,
                subjectC: 'C=' + c.subject.types_and_values[0].value.value_block.value,
                subjectCN: 'CN=' + c.subject.types_and_values[1].value.value_block.value,
                validFrom: c.notBefore.value.toString(),
                validTo: c.notAfter.value.toString()
            }
        } else {
            return {}
        }
    }

    getCertInfoFromFile = (pemFile) => {
        return require('fs').readFileSync(pemFile, 'ascii')
    }
}

export default CertInfo