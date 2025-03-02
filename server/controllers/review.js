const Review = require('../models/review'); // Renamed model

// POST - Add a new review
exports.postAddReview = async (req, res, next) => {
  console.log(req.body);
  try {
    const { company, pros, cons, rating } = req.body;

    let existingReview = await Review.findOne({ where: { company: company } });

    if (existingReview) {
      existingReview.pros += `; ${pros}`;
      existingReview.cons += `; ${cons}`;
      
      existingReview.rating = parseFloat((Math.floor(((existingReview.rating + parseInt(rating)) / 2) * 2) / 2).toFixed(1));
      console.log(existingReview.rating)

      await existingReview.save();
      console.log('Updated Review');
      res.status(200).json({ message: 'Review updated successfully', review: existingReview });

    } else {
      const newReview = await Review.create({
        company,
        pros,
        cons,
        rating
      });

      console.log('Created New Review');
      res.status(201).json({ message: 'Review created successfully', review: newReview });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating/updating review', error: err.message });
  }
};


// GET - Fetch all reviews
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.findAll();

    // Convert rating to a float before sending response
    const formattedReviews = reviews.map(review => ({
      ...review.toJSON(),
      rating: parseFloat(review.rating)  // Ensures correct decimal format
    }));

    console.log(formattedReviews)

    res.status(200).json({ reviews: formattedReviews });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id; // Get the ID from request params

    const review = await Review.findByPk(reviewId); // Find the review by ID

    if (!review) {
      return res.status(404).json({ message: 'Review not found' }); // 404 Not Found
    }

    await review.destroy(); // Delete the review

    res.status(200).json({ message: 'Review deleted successfully' }); // Success
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting review', error: err.message }); // Internal Server Error
  }
};

