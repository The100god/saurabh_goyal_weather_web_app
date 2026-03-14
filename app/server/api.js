// "use client"
import axios from "axios";;

export const apiTableData = async(dataOrder, offset)=>{
    // await axios.get('https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/table/?disjunctive.cou_name_en&sort=name').then(
    //     (response) =>{
            
    //       return response.data
    //     }
    //   ).then((data)=> {
    //     console.log(data)
    //  })
    //  .catch(error => {
    //     console.log(error)
    //  })

    try {
        const response = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10&offset=${offset}&order_by=${dataOrder}`)
         return response
    }catch (error) {
        console.error("Error:", error.message); // Log the error message
        
        
        throw error; // Optional: rethrow the error for handling further up the call stack
    }
}

