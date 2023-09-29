import { request } from "http";
import { useEffect, useState } from "react";


// const TopMoak = () => {
//     // const [bone, changeBone] = useState(test);
//     // changeBone({
//     //     bone: 7
//     // });
//     useEffect(() => {
//         const getExpenses = async () => {
//             const endpoint: string = "http://localhost:5000/expenses"
//             const requestOptions = {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'mode': 'no-cors'
//                 }
//             };
//             const response = await fetch(endpoint, requestOptions);
//             const content = await response.json();
//             console.log("EXPENSES:", content)
//         }

//         getExpenses();
//         console.log('something something');
//         console.log(test);
//         test = "seven";
//         console.log(test);
//     }, [])
//     return (
//         <div className="top-moak">
//             "Hello";
//             {test}
//         </div>

//     );
// };
// export default TopMoak;

// export default function Moak() {
//     const [bone, setBone] = useState("");

//     function 
// }

function Moak() {
    // const [jsonData, setJsonData] = useState(Object);
    const [jsonData, setJsonData] = useState(null);

    useEffect(() => {
        const getExpenses = async () => {
            const endpoint: string = "http://localhost:5000/expenses"
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'no-cors'
                }
            };
            const r = await fetch(endpoint, requestOptions);
            const content = await r.json();
            console.log("r:", r);
            console.log("EXPENSES:", content)
            setJsonData(content);
        }
        getExpenses();
    }, [])

    return (
        <div>
            <h1>JSON Data</h1>
            {/* {jsonData} */}
            {jsonData ? (
                <pre>{JSON.stringify(jsonData, null, 2)}</pre>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Moak;
