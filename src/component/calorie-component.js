import React from 'react';

const getColorBasedOnCalorie = (calorie) => {
  if (calorie > 0 && calorie <= 200) {
    return 'green';
  } else if (calorie > 200 && calorie <= 500) {
    return 'yellow';
  } else if (calorie > 500) {
    return 'red';
  } else {
    return 'black'; // Default color or any other color you prefer for other cases
  }
};

const DishComponent = ({ dish }) => {
  const color = getColorBasedOnCalorie(dish.Calorie);

  return (
    <div>
      <p style={{ marginTop: '-15px', marginBottom: '0px' }}>
        <span
          style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: color,
          }}
        ></span>
      </p>
    </div>
  );
};

export default DishComponent;
