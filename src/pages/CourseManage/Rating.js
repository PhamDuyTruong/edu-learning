import React from 'react';
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";


const RatingCourse = () => {
  return (
    <Box
    display="flex"
    alignItems="center"
  >
    <Box flexGrow={1}>
      <Rating
        name="hover-feedback"
        value={4}
        precision={0.5}
      />
    </Box>
  </Box>
  )
}

export default RatingCourse;