const AddVehicleForm = ({}) => {
    return ( 
        <form >
            <label>Vehicle Identification Number(VIN)
                <input type="text" />
            </label>
            <label>Give your vehicle a NAME.
                <input type="text" />
            </label>
            <label>What TYPE of vehicle is it?
                <input type="text" />
            </label>
            <label>What is the vehicle's YEAR of manufacture?
                <input type="number" />
            </label>
            <label>What is the MAKE of the vehicle?
                <input type="text" />
            </label>
            <label>What is the MODEL of the vehicle?
                <input type="text" />
            </label>
            <label>What COLOR is the vehicle?
                <input type="text" />
            </label>
            <label>How many MILES are on the odometer?
                <input type="number" />
            </label>
            <label>Do you want to keep records of this vehicle?
                <input type="checkbox" />
            </label>
        </form>
     );
}
 
export default AddVehicleForm;