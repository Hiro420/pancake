// This things are protobuffers
// https://protogen.marcgravell.com/decode


const protobuf = require("protobufjs");
const dataUtil = require("../util/dataUtil");
async function query_cur_region_protobuffer() {

    var query_region_list = 'Gq8bCgw0Ny4yNTIuMTkuNDIQ1qwBGitodHRwczovL29zdXNhb2FzZXJ2ZXIueXVhbnNoZW4uY29tL3JlY2hhcmdlOgNVU0FCOWh0dHBzOi8vYXV0b3BhdGNoaGsueXVhbnNoZW4uY29tL2NsaWVudF9nYW1lX3Jlcy8yLjRfbGl2ZUo8aHR0cHM6Ly9hdXRvcGF0Y2hoay55dWFuc2hlbi5jb20vY2xpZW50X2Rlc2lnbl9kYXRhLzIuNF9saXZlUo8BaHR0cHM6Ly93ZWJzdGF0aWMtc2VhLm1paG95by5jb20veXMvZXZlbnQvaW0tc2VydmljZS9pbmRleC5odG1sP2ltX291dD1mYWxzZSZzaWduX3R5cGU9MiZhdXRoX2FwcGlkPWltX2NjcyZhdXRoa2V5X3Zlcj0xJndpbl9kaXJlY3Rpb249cG9ydHJhaXRiCDIuNF9saXZlcJyQ3gKQAfXu3AKaAVx7InJlbW90ZU5hbWUiOiAiZGF0YV92ZXJzaW9ucyIsICJtZDUiOiAiZDQ3MGY0MWRkYTNkMTVkNjYyYWRlZDhhYjMxOTdhODUiLCAiZmlsZVNpemUiOiA0NDA0faIBW3sicmVtb3RlTmFtZSI6ICJkYXRhX3ZlcnNpb25zIiwgIm1kNSI6ICI0MWY5OTZhN2RmYzk3MmE5NjFjMjQ5ZWQ4ZWY2YmQ2YyIsICJmaWxlU2l6ZSI6IDUxNX2yAacECK6t2wIahgR7InJlbW90ZU5hbWUiOiAicmVzX3ZlcnNpb25zX2V4dGVybmFsIiwgIm1kNSI6ICI3ZTUyODcxZDRiYjZhMjgxNjI4OTkyYTYyYjlhNjYyNyIsICJmaWxlU2l6ZSI6IDQ4MzAzMH0NCnsicmVtb3RlTmFtZSI6ICJyZXNfdmVyc2lvbnNfbWVkaXVtIiwgIm1kNSI6ICJiZDJhMzhjNjNjMzcyMzIxYzljNTg5NWM5NjczOGIxZSIsICJmaWxlU2l6ZSI6IDI3MDg5MH0NCnsicmVtb3RlTmFtZSI6ICJyZWxlYXNlX3Jlc192ZXJzaW9uc19leHRlcm5hbCIsICJtZDUiOiAiNWRlZGVkOGIzMTJmYTUwMzVlMmM5YzI1NmQ2YTFjYmIiLCAiZmlsZVNpemUiOiA0ODMwMzB9DQp7InJlbW90ZU5hbWUiOiAicmVsZWFzZV9yZXNfdmVyc2lvbnNfbWVkaXVtIiwgIm1kNSI6ICI3ZGE3Y2MyZGVhZWIzNWUwYmRjOWE2YzY4MDhjNWFhNCIsICJmaWxlU2l6ZSI6IDI3MDg5MH0NCnsicmVtb3RlTmFtZSI6ICJiYXNlX3JldmlzaW9uIiwgIm1kNSI6ICI1YTUyNzgzYWY3YjhhZDdjMmE0OGJiNjdkYmE2NWE1MyIsICJmaWxlU2l6ZSI6IDE4fSIBMCoKYjZiZGE1Y2QyYjIIMi40X2xpdmW6AZwQRWMyYhAAAACRgo74BzK07IdzLYLB+X6zAAgAAMOOtJP/5vvtTMSBF1AnJP997kZG14dqgtvfwIr8C4SsWvlx1UgL9HSheXa7AaACj8uDhSiPQyYQsrD7d/kSpm11b3YGpLbnGs+BlO/69cLqxBx8n/nnRLKKQ72wnmuJ2yVXvfqmB18ATy3qcxTcpjFlafXkpIsksAe2lzjC7lqO7rU2JNbdwVfrHOwu/H/2jyHxnQ/7N13E0M8xAT2LuBQRuA+j2fKExhr4NJlreav5NqphHBfAnc1Kyd/Jf04kLjUq1ht7PwC3Q8F6KKZbAhJfdrKa8WbMIKXyiLKD1LlUhlACDzh2Nt/mM8f49AGjCFG3mQepsBqn33DbVtakm3niVq/9hxvY23QZa/8Jz6QxXRp+KAM7LmnGgmBjDvL5FNtC6cJ+yN33Htx/c35g6pq6ChOXerYgd/nttdvo4H7d29uLXbnWBiGxVRu2t/g0GB7Ug0+QTikIGyrOD8OC5LPL2Ka6yDh8H8RwC4zumJapDCXG2D2GFAhN2orVYDBaC87WZFWBAUsegEDhBxvz5Kbg0p5oZA8bzc1/D75sIRBlkTmOZE2g5vNW5i6zG3/QGAcuYNmSj+Vb8Opy8H1a0u4HrDT099CWTx862QolBwe/XqFiuoUkpUF9W+8+v6pCBVdOl/qYKdpagOJmriWFJt7MesJoHiWsQz/yOkaVNRIkRW9088ZExqN1mn6djw4NKvLI4+wPsV0RI391oLHcD15wgwcji01fbuBnfuysEWcCv/TgoSjVOcV7XuFUDH907zYwZdOwEBLcgUNrMAju2LIlsdxCL9qKsv85dUBJ1Y/AVXHwE8IIbvb8WNqENie3o8QhLSA0SiVxYPM4gex9TWlpJ85cwzgvNFKn1ihQh/Hwuygd8rLgD6TeCNItcvHUXGXYhyt2iJoUrOxlw8q+QaRt+UX2ZNXAaiJdS/PplmWCsV4pysynHGF5diWRb5K/k1g4waFSAQ0AWtUY1jxxhdzk+yloles7B3Ic1VHu63ullOz4c0Q0wf5sPpMbJnCLrjAdnE7G5NvU4EnEBndSJEJ81D1LRmKEIr9IuiWwCRXNJzC5dLTHbOMQDwHny9pan0zCDGybn4qIQQTL2hJ3IaIZJg7axhk7i7wVmEjbZUrkpgvBjpXpwlBuG1zFjPmR8JyAPxrJjbEEdcEpWlxTRp6f0J8P6uyNwbcmsqeQn9zxixTHYaOdNvzXGOabkTp3LTQECn+Puc1J354b6lCtwwFpfRIuQrU1CeVaKbodBxU5NJhI4BbrQx40JVwtxdyVlaSFJ9tn2R5Wpdpf3rwfbGVScbDHBBKDq2zJh6pmHeCSHZyzIcvbj2QlKD3Pi862BV16azcNFz4RZCOGbVjPeVM+DX7hVsN3fiI3d7MxTAN1r7WfR7NV23SO7B60RkSGhp/ZTcsoKHzmYVx0AtqI20clDpZSUGFVL0QdfCMRCB4rXw/kOqVGOxTOE7GKEpKFSIyZEHCL+HbEC8hvErVki+G+HSWRCIvLZPQUHGOdv4KDvxW74wf0c/nGXf6+ie2pBrJDjcLVAZant4vj4obyFG30wNgMEbmk4Kby8BZDsV0Y+FI9JUxMQdraPPSEZCf3gA2vXmsKIdMbMAFMR6ZrIlKMUc91BeIBM6VauF5pjqdm2hNvlI+K7ZM7x+Xcjg2Dt/RRrnb8GcH+m2jpRQCscgX2lUvluP7nWJyyqqMk+33LsTqsfHMcS2SOirg7N56znv1PcsSIKb8WUmRHo8llb70VU8yjd0MzKK1V8KD8jJbYSaRWwKEbflTzsDFDgD6Nx4cv+oj9N8JlFFAVH+EkknmKDql874+tH6Lp8pd7oJqb3RDEtsHsk1Mau4JEe8SHwJy82LG9Xi48tKIkWxxrtUJMISrajMI7g38jnFGr83M2zYs0B1VTkX7ImUzLsy1Ln1ZAboPS65mJE5FIDbNHQpCkCN0bFT/dCosfoC2Jm5yEQIZSW5oM2ylCwPYqU91VN2i11ef6NPe6QL6SiRh7JPImwt8gj9r39pjy4mwRyIxjNU9PrKuvNpIwtb7CVl5diVTIg0Gx1v82pjYsT51O7k64qIwlGC0x7dzOQ+XdSMSFCM1sk2OvvcxZTtwQWVAmDmqhNAeJ3DH61fa5Lii2suvXTzEC7qheTMQ/KEwNRxQz1BL6RYlITa8ZtlUpe46MY3+08GJC4A2gys6eQpm4+BHQr50bmfEvl7c63pqp0JMH3Gz8ZEvBskMVXsfY8awW89nYnCNYZH74t4bvKqhSfO/zs3oPUVoz6S3fwMebROsAoehzvBVDCjvICjEhamkzOIt+gDfIrDlZto2yj31ptgsfBcIeFXcijyf99xWz05/XQvaMdf8HAxwLWusBqpNtuAd0CWurPoCk9f6m/hzm89YvckRRHJ3iZKZLepE3MLNZH6D3kFAMGssvaexY9Zd9E1vaCGcA3cgPe+OnP20dnWbdM0LRl7Mp4Y6JvO3/U9gH7yt+hKFkAOIcYmb7Cp+hPleENtvbexYD9I9aKhe4rvoZYJeiGJJs4X/y1XUCWxrJUuk6Wv06S7BV0Zwl/61gaL1NNY8rzNMO3+2MnNEujXAlC7Qx9mZ6ndySmAKYblji1i0JQyYPwkUqStceFfoVjbk1xE2n1ZZOX7fXaOhLfZK3BchyswEyNUmmqaK51GL9K4C+oTfcviGZdQsri/7slsvYqi5jubY8fYIrSpQk+B3I+kFh+ln4Ps5gFa2j1Y78wgFMaHR0cHM6Ly93ZWJzdGF0aWMtc2VhLm1paG95by5jb20veXMvZXZlbnQvZTIwMjAwNDEwZ29fY29tbXVuaXR5L2luZGV4Lmh0bWwjL9IBCmJjMDRkZGI5NzXaAQo2Yjk1MzhhMzhk+gEaaHR0cHM6Ly9hY2NvdW50Lm1paG95by5jb22CAm5odHRwczovL2hrNGUtYXBpLW9zLm1paG95by5jb20vY29tbW9uL2FwaWNka2V5L2FwaS9leGNoYW5nZUNka2V5P3NpZ25fdHlwZT0yJmF1dGhfYXBwaWQ9YXBpY2RrZXkmYXV0aGtleV92ZXI9MYoCSWh0dHBzOi8vYWNjb3VudC5taWhveW8uY29tLyMvYWJvdXQvcHJpdmFjeUluR2FtZT9hcHBfaWQ9NCZiaXo9aGs0ZV9nbG9iYWxanBBFYzJiEAAAAJGCjvgHMrTsh3MtgsH5frMACAAAw460k//m++1MxIEXUCck/33uRkbXh2qC29/AivwLhKxa+XHVSAv0dKF5drsBoAKPy4OFKI9DJhCysPt3+RKmbXVvdgaktucaz4GU7/r1wurEHHyf+edEsopDvbCea4nbJVe9+qYHXwBPLepzFNymMWVp9eSkiySwB7aXOMLuWo7utTYk1t3BV+sc7C78f/aPIfGdD/s3XcTQzzEBPYu4FBG4D6PZ8oTGGvg0mWt5q/k2qmEcF8CdzUrJ38l/TiQuNSrWG3s/ALdDwXooplsCEl92sprxZswgpfKIsoPUuVSGUAIPOHY23+Yzx/j0AaMIUbeZB6mwGqffcNtW1qSbeeJWr/2HG9jbdBlr/wnPpDFdGn4oAzsuacaCYGMO8vkU20Lpwn7I3fce3H9zfmDqmroKE5d6tiB3+e212+jgft3b24tdudYGIbFVG7a3+DQYHtSDT5BOKQgbKs4Pw4Lks8vYprrIOHwfxHALjO6YlqkMJcbYPYYUCE3aitVgMFoLztZkVYEBSx6AQOEHG/PkpuDSnmhkDxvNzX8PvmwhEGWROY5kTaDm81bmLrMbf9AYBy5g2ZKP5Vvw6nLwfVrS7gesNPT30JZPHzrZCiUHB79eoWK6hSSlQX1b7z6/qkIFV06X+pgp2lqA4mauJYUm3sx6wmgeJaxDP/I6RpU1EiRFb3TzxkTGo3Wafp2PDg0q8sjj7A+xXREjf3WgsdwPXnCDByOLTV9u4Gd+7KwRZwK/9OChKNU5xXte4VQMf3TvNjBl07AQEtyBQ2swCO7YsiWx3EIv2oqy/zl1QEnVj8BVcfATwghu9vxY2oQ2J7ejxCEtIDRKJXFg8ziB7H1NaWknzlzDOC80UqfWKFCH8fC7KB3ysuAPpN4I0i1y8dRcZdiHK3aImhSs7GXDyr5BpG35RfZk1cBqIl1L8+mWZYKxXinKzKccYXl2JZFvkr+TWDjBoVIBDQBa1RjWPHGF3OT7KWiV6zsHchzVUe7re6WU7PhzRDTB/mw+kxsmcIuuMB2cTsbk29TgScQGd1IkQnzUPUtGYoQiv0i6JbAJFc0nMLl0tMds4xAPAefL2lqfTMIMbJufiohBBMvaEnchohkmDtrGGTuLvBWYSNtlSuSmC8GOlenCUG4bXMWM+ZHwnIA/GsmNsQR1wSlaXFNGnp/Qnw/q7I3Btyayp5Cf3PGLFMdho502/NcY5puROnctNAQKf4+5zUnfnhvqUK3DAWl9Ei5CtTUJ5Vopuh0HFTk0mEjgFutDHjQlXC3F3JWVpIUn22fZHlal2l/evB9sZVJxsMcEEoOrbMmHqmYd4JIdnLMhy9uPZCUoPc+LzrYFXXprNw0XPhFkI4ZtWM95Uz4NfuFWw3d+Ijd3szFMA3WvtZ9Hs1XbdI7sHrRGRIaGn9lNyygofOZhXHQC2ojbRyUOllJQYVUvRB18IxEIHitfD+Q6pUY7FM4TsYoSkoVIjJkQcIv4dsQLyG8StWSL4b4dJZEIi8tk9BQcY52/goO/FbvjB/Rz+cZd/r6J7akGskONwtUBlqe3i+PihvIUbfTA2AwRuaTgpvLwFkOxXRj4Uj0lTExB2to89IRkJ/eADa9eawoh0xswAUxHpmsiUoxRz3UF4gEzpVq4XmmOp2baE2+Uj4rtkzvH5dyODYO39FGudvwZwf6baOlFAKxyBfaVS+W4/udYnLKqoyT7fcuxOqx8cxxLZI6KuDs3nrOe/U9yxIgpvxZSZEejyWVvvRVTzKN3QzMorVXwoPyMlthJpFbAoRt+VPOwMUOAPo3Hhy/6iP03wmUUUBUf4SSSeYoOqXzvj60founyl3ugmpvdEMS2weyTUxq7gkR7xIfAnLzYsb1eLjy0oiRbHGu1QkwhKtqMwjuDfyOcUavzczbNizQHVVORfsiZTMuzLUufVkBug9LrmYkTkUgNs0dCkKQI3RsVP90Kix+gLYmbnIRAhlJbmgzbKULA9ipT3VU3aLXV5/o097pAvpKJGHsk8ibC3yCP2vf2mPLibBHIjGM1T0+sq682kjC1vsJWXl2JVMiDQbHW/zamNixPnU7uTriojCUYLTHt3M5D5d1IxIUIzWyTY6+9zFlO3BBZUCYOaqE0B4ncMfrV9rkuKLay69dPMQLuqF5MxD8oTA1HFDPUEvpFiUhNrxm2VSl7joxjf7TwYkLgDaDKzp5Cmbj4EdCvnRuZ8S+XtzremqnQkwfcbPxkS8GyQxVex9jxrBbz2dicI1hkfvi3hu8qqFJ87/Ozeg9RWjPpLd/Ax5tE6wCh6HO8FUMKO8gKMSFqaTM4i36AN8isOVm2jbKPfWm2Cx8Fwh4VdyKPJ/33FbPTn9dC9ox1/wcDHAta6wGqk224B3QJa6s+gKT1/qb+HObz1i9yRFEcneJkpkt6kTcws1kfoPeQUAwayy9p7Fj1l30TW9oIZwDdyA9746c/bR2dZt0zQtGXsynhjom87f9T2AfvK36EoWQA4hxiZvsKn6E+V4Q229t7FgP0j1oqF7iu+hlgl6IYkmzhf/LVdQJbGslS6Tpa/TpLsFXRnCX/rWBovU01jyvM0w7f7Yyc0S6NcCULtDH2Znqd3JKYAphuWOLWLQlDJg/CRSpK1x4V+hWNuTXETafVlk5ft9do6Et9krcFyHKzATI1SaapornUYv0rgL6hN9y+IZl1CyuL/uyWy9iqLmO5tjx9gitKlCT4Hcj6QWH6Wfg+zmAVraPVjvxiqQKyejDLPUAOCN3SCMK8pVhVMMUQbCM/x1IsRxEP81ySEZ6DPjKsLENg5268Crl6iTjnGMy1olxdV5h50Ge4QQcH6xnNqy61kzT8ZDTJblTjxH67yyg3VfHs3g8rFhkuOwCvXkUHl5m0WRYCogZv3gOcc2omNhKYrw4znIxozjxwJjiBnIZmU0xCkA1iyY9mzyOVtvkzzLVnnlXwzql8Uerzn0oyqxaiYGLZbrr8lVfTZ24OJbL51mbD6LtGvfiQj0J3NoA0CgAUvCMiZ8W5hAC5rkql8m9hkJjcxgE1qm5I6/WszVe6eEOl0TvOrlyptzzuIYxqvuTFC8N+3sd5nkUPhaqr25lnlNVdUoAxzDQ+6Noyv8akFex9XrTvTdaob1dgvJ/V4E/3cAw='

    var hack_query = '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'

    var IridiumDump = "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"

    const root = await protobuf.load("proto/QueryCurrRegionHttpRsp.proto");
    const testMessage = root.lookup("QueryCurrRegionHttpRsp");
    
    const queryList14 = testMessage.decode(Buffer.from(query_region_list, 'base64'));
    // unlock here
     const queryList15 = testMessage.decode(Buffer.from(hack_query, 'base64'));

    //queryList15["regionInfo"].gateserverIp = "127.0.0.1"
    //queryList15["regionInfo"].gateserverPort = 80
    //queryList15["regionInfo"].resource_url = "https://autopatchhk.yuanshen.com/client_game_res/2.4_live"
    //queryList15["regionInfo"].data_url = "https://autopatchhk.yuanshen.com/client_design_data/2.4_live"
    
    // unlock here
    queryList15["regionInfo"].secretKey = queryList14["regionInfo"].secretKey
   
    // queryList15["regionInfo"]["resVersionConfig"].versionSuffix = queryList14["regionInfo"]["resVersionConfig"].versionSuffix

    // unlock here
    queryList15.clientSecretKey = queryList14.clientSecretKey;
    queryList15.regionCustomConfigEncrypted = queryList14.regionCustomConfigEncrypted;

    // this is for dump
    //queryList15 = testMessage.decode(Buffer.from(IridiumDump, 'base64'));
    //queryList15.regionInfo.gateserverIp = "127.0.0.1";

    const encoded = testMessage.encode(queryList15).finish();
    console.log(queryList15);
    return encoded;
}

module.exports = {
    async execute(req, res) {   
        var ret = await query_cur_region_protobuffer();
        res.end(Buffer.from(ret).toString('base64'));
    }
}
