import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const ImgCard = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("New Title");
  const [description, setDescription] = useState("New Description");
  const [buttonColor, setButtonColor] = useState("#9e9e9e");
  const [cards, setCards] = useState([]); // yeni eklenen kartları saklamak için 

  // firestore'dan verileri çekmek için
  const fetchCards = async () => {
    const cardsCollection = collection(db, "cards");
    const cardsSnapshot = await getDocs(cardsCollection);
    const cardData = cardsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCards(cardData);
  };

  useEffect(() => {
    // sayfa yüklendiğinde firestore'dan verileri çekmek için
    fetchCards();
  }, []); 

  const handleFileChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImage(imageUrl);
      setButtonColor(description !== "New Description" ? "green" : "#9e9e9e");
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setButtonColor(image && title !== "New Title" ? "green" : "#9e9e9e");
  };

  const upload = async () => {
    if (buttonColor === "green") {
      const docRef = await addDoc(collection(db, "cards"), {
        title,
        description,
        image,
      });

      console.log("Document written with ID: ", docRef.id);

      // yeni kart ekledikten sonra firestore'dan güncel verileri çek
      fetchCards();

      setTitle("New Title");
      setDescription("New Description");
      setImage(null);
      setButtonColor("#9e9e9e");
    }
  };

  return (
    <div
      style={{
        margin: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems:"left"
      }}
    >
      <Typography
        sx={{
          maxWidth: 150,
          border: "1px solid black",
          borderRadius: "10px 10px 0px 0px",
          textAlign: "center",
          padding: "5px 10px",
        }}
      >
        New Title
      </Typography>
      <Card
        sx={{
          maxWidth: 345,
          border: "1px solid black",
          borderRadius: "0 10px 10px 10px",
          marginBottom: "20px", 
        }}
      >
        <CardContent>
          <textarea
            style={{
              color: "red",
              fontFamily: "sans-serif",
              border: "none",
              resize: "none",
            }}
            value={title}
            onChange={handleTitleChange}
          />
          <textarea
            style={{
              margin: "10px 0px",
              fontFamily: "sans-serif",
              height: "200px",
              border: "none",
              width: "300px",
              color: "black",
              resize: "none",
              overflow: "auto",
            }}
            value={description}
            onChange={handleDescriptionChange}
          />
        </CardContent>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "300px",
            width: "300px",
            borderRadius: "none",
            position: "relative",
            border: "none",
            backgroundColor: "#f8bbd0",
            margin: "0 auto",
          }}
        >
          {!image ? (
            <>
              <input
                accept="image/*"
                style={{
                  display: "none",
                }}
                id="image-upload-input"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="image-upload-input">
                <IconButton
                  component="span"
                  sx={{
                    borderRadius: "50%",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "black",
                  }}
                >
                  <AddIcon sx={{ fontSize: 80 }} />
                </IconButton>
              </label>
              <Box
                sx={{
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginTop: "60px",
                  color: "black",
                }}
              >
                GÖRSEL
              </Box>
            </>
          ) : (
            <img
              src={image}
              alt="uploaded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          )}
        </Box>

        <Box
          sx={{ display: "flex", justifyContent: "flex-end", margin: "5px" }}
        >
          <Button
            onClick={upload}
            variant="contained"
            size="small"
            style={{
              width: "7px",
              height: "30px",
              borderRadius: "0",
              backgroundColor: buttonColor,
            }}
          ></Button>
        </Box>
      </Card>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "left",
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            sx={{
              maxWidth: 345,
              border: "1px solid black",
              borderRadius: "0 10px 10px 10px",
              marginTop: "20px",
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {card.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
              {card.image && (
                <img
                  src={card.image}
                  alt="uploaded"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "4px",
                    marginTop: "10px",
                  }}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImgCard;
