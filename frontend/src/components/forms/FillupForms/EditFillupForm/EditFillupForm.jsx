const EditFillupForm = ({}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Station
          <input
            placeholder="Gas Station Name"
            type="text"
            value={stationName}
            onChange={handleStationName}
          />
        </label>
      </div>
      <div>Previous odometer: {prevOdometer}</div>
      <div>
        <label>
          Odometer reading today
          <input
            placeholder="Current Odometer"
            type="number"
            value={odometer}
            onChange={handleOdometer}
          />
        </label>
      </div>
      <div>
        <label>
          Fuel type/ rating
          <input
            placeholder="Fuel Rating"
            type="text"
            value={fuelType}
            onChange={handleFuelType}
          />
        </label>
      </div>
      <div>
        <label>
          Price Per Gallon
          <input
            placeholder="What is the Price per Gallon?"
            type="float"
            value={fuelPPG}
            onChange={handleFuelPPG}
          />
        </label>
      </div>
      <div>
        <label>
          Volume of fuel
          <input
            placeholder="How much fuel did you add?"
            type="number"
            value={fuelVolume}
            onChange={handleFuelVolume}
          />
        </label>
      </div>
      <div>Total price: ${cost}</div>
      <div>
        <label>
          Today's Date
          <input type="date" value={date} onChange={handleDate} />
        </label>
      </div>
      <div>
        <label>
          Notes
          <input
            placeholder="Notes"
            type="text"
            value={notes}
            onChange={handleNotes}
          />
        </label>
      </div>
      <p>**MUST FILL OUT ALL FIELDS**</p>
      <div>
        <button onClick={handleCancel}>CANCEL</button>
        <button type="submit">SAVE</button>
      </div>
    </form>
  );
};

export default EditFillupForm;
