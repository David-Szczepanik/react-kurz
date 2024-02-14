import { useEffect, useState } from "react";
import rawData from "./dogsData.json";
import PageContainer from "./components/PageContainer/PageContainer";
import DogList from "./components/DogList/DogList";
import DogForm from "./components/DogForm/DogForm";
import Toggler from "./components/Toggler/Toggler";
import ShelterForm from "./components/ShelterForm/ShelterForm";

function App() {
  const [listOfDogs, setListOfDogs] = useState(rawData.dogs);
  const [newDog, setNewDog] = useState({
    id:
      listOfDogs.length > 0
        ? Math.max(...listOfDogs.map((dog) => dog.id)) + 1
        : 1,
    name: "",
    breed: "",
    age: "",
  });

  const [valid, setValid] = useState(false);

  const [activeTab, setActiveTab] = useState(1);

  const [shelterStorage, setShleterStorage] = useState({
    food: 35,
    vaccine: 15,
    pills: 20,
  });

  const validateData = (dog) => {
    if (dog.age === "" || dog.age < 0 || dog.age > 18) {
      setValid(false);
    } else if (dog.name.trim().length === 0) {
      setValid(false);
    } else if (dog.breed.trim().length === 0) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleChange = (event) => {
    const updatedDog = { ...newDog, [event.target.name]: event.target.value };
    validateData(updatedDog);
    setNewDog(updatedDog);
  };

  const handleAdd = () => {
    setListOfDogs((listOfDogs) => {
      return [...listOfDogs, newDog];
    });
    const newDogId = newDog.id + 1;
    const updatedDog = {
      id: newDogId,
      name: "",
      breed: "",
      age: "",
    };
    setNewDog(updatedDog);
    validateData(updatedDog);
  };

  const handleDelete = (idToDelete) => {
    setListOfDogs(listOfDogs.filter((dog) => dog.id !== idToDelete));
  };

  const handleChoose = (source) => {
    switch (source) {
      case "list-of-dogs": {
        setActiveTab(1);
        break;
      }
      case "shelter-storage": {
        setActiveTab(2);
        break;
      }
      default:
        break;
    }
  };

  const handleAddToStorage = () => {
    null;
  };

  return (
    <div className="App">
      <PageContainer>
        <Toggler active={activeTab} onChoose={handleChoose} />
        {activeTab === 1 && (
          <>
            <DogList data={listOfDogs} onDelete={handleDelete} />
            <DogForm
              data={newDog}
              validation={valid}
              onChange={handleChange}
              onAdd={handleAdd}
            />
          </>
        )}
        {activeTab === 2 && (
          <>
            <h3>Aktuální zásoby</h3>
            <p>granule: {shelterStorage.food} kg</p>
            <p>vakcíny: {shelterStorage.vaccine} ks</p>
            <p>medikamenty: {shelterStorage.pills} ks</p>
            <ShelterForm onAdd={handleAddToStorage} />
          </>
        )}
      </PageContainer>
    </div>
  );
}

export default App;
