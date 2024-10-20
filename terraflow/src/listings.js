import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import farm1 from './farm1.jpg';
import farm2 from './farm2.jpg';

const ListingTile = ({ listing, onDelete }) => {
    const [hover, setHover] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const springProps = useSpring({
        transform: hover ? 'scale(1.1)' : 'scale(1)',
        config: { tension: 600, friction: 10 },
    });

    const toggleInfo = () => {
        setExpanded(!expanded);
    };

    return (
        <animated.div
            className="listing-tile"
            style={springProps}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >

            <img src={listing.image} alt={listing.title} className="listing-image" />
            <div className="button-container">
                <button className="info-button" onClick={toggleInfo}>
                    {expanded ? "Less Info" : "More Info"}
                </button>
                <button onClick={() => alert(`Stake on ${listing.title}`)} className="stake-button">
                    Stake
                </button>
                <button onClick={() => onDelete(listing.title)} className="delete-button" style={{ backgroundColor: 'red', color: 'white' }}>
                    Delete
                </button>
            </div>
            {expanded && (
                <div className="listing-description">
                    <p><strong>Property Name:</strong> {listing.title}</p>
                    <p><strong>Lister:</strong> {listing.listerName}</p>
                    <p><strong>Capital Requested:</strong> ${listing.capitalRequested}</p>
                    <p><strong>Description:</strong> {listing.description}</p>
                </div>
            )}
        </animated.div>
    );
};

const ListingsPage = () => {
    const [listings, setListings] = useState([
        {
            title: "Farm 1",
            image: farm1,
            listerName: "John Doe",
            capitalRequested: 50000,
            description: "Beautiful farm with rich soil."
        },
        {
            title: "Farm 2",
            image: farm2,
            listerName: "Jane Smith",
            capitalRequested: 75000,
            description: "Perfect location for organic farming."
        },
    ]);

    const [showForm, setShowForm] = useState(false);
    const [newListing, setNewListing] = useState({
        title: "",
        image: null,
        listerName: "",
        capitalRequested: "",
        description: ""
    });

    const [errors, setErrors] = useState({
        title: false,
        image: false,
        listerName: false,
        capitalRequested: false,
        description: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewListing({
            ...newListing,
            [name]: value,
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file && file.type.startsWith("image/")) {
                setNewListing({
                    ...newListing,
                    image: URL.createObjectURL(file)
                });
                setErrors({ ...errors, image: false }); // Reset image error
            } else {
                alert("Please upload a valid image file.");
            }
        }
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            title: !newListing.title,
            image: !newListing.image,
            listerName: !newListing.listerName,
            capitalRequested: !newListing.capitalRequested || isNaN(newListing.capitalRequested) || newListing.capitalRequested <= 0,
            description: !newListing.description
        };

        // Set error states
        setErrors(newErrors);

        // Check if any field is invalid
        for (const key in newErrors) {
            if (newErrors[key]) valid = false;
        }

        if (!valid) {
            alert("Please fill out all fields correctly before submitting.");
        }

        return valid;
    };

    const addNewListing = () => {
        if (!validateForm()) return; // Stop if validation fails

        // Add new listing to the array
        setListings([...listings, newListing]);

        // Reset form fields after submission
        setNewListing({
            title: "",
            image: null,
            listerName: "",
            capitalRequested: "",
            description: ""
        });

        setShowForm(false);
    };

    const deleteListing = (title) => {
        setListings(listings.filter(listing => listing.title !== title));
    };

    const openForm = () => setShowForm(true);
    const closeForm = () => setShowForm(false);

    return (
        <div>
            <h1>TerraFlow Listings</h1>
            <div className="listings-container">
                {listings.map((listing, index) => (
                    <ListingTile key={index} listing={listing} onDelete={deleteListing} />
                ))}
            </div>
            <div className="create-button-container">
                <button onClick={openForm} className="create-button">+</button>
            </div>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Create New Listing</h2>
                        <div className="form-group">
                            <label>Property Name</label>
                            <input
                                type="text"
                                name="title"
                                value={newListing.title}
                                onChange={handleInputChange}
                                placeholder="Enter property name"
                                className={errors.title ? "error" : ""}
                            />
                        </div>
                        <div className="form-group">
                            <label>Land Photo</label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className={errors.image ? "error" : ""}
                            />
                        </div>
                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                name="listerName"
                                value={newListing.listerName}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                className={errors.listerName ? "error" : ""}
                            />
                        </div>
                        <div className="form-group">
                            <label>Capital Requested</label>
                            <progress value={newListing.capitalRequested} max="100000"></progress>
                            <input
                                type="number"
                                name="capitalRequested"
                                value={newListing.capitalRequested}
                                onChange={handleInputChange}
                                placeholder="Enter capital requested"
                                className={errors.capitalRequested ? "error" : ""}
                            />
                        </div>
                        <div className="form-group">
                            <label>Property Details</label>
                            <textarea
                                name="description"
                                value={newListing.description}
                                onChange={handleInputChange}
                                placeholder="Enter property details"
                                className={errors.description ? "error" : ""}
                            />
                        </div>
                        <button onClick={addNewListing} className="stake-button">Post</button>
                        <button onClick={closeForm} className="close-button">Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingsPage;
