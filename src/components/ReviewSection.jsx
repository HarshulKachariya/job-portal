import React from "react";

const ReviewSection = () => {
  // Array of review data objects
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/50",
      role: "UI/UX Designer",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ut nulla eu magna pharetra commodo. Phasellus ultrices sapien in urna tincidunt, a aliquet nunc scelerisque.",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/50",
      role: "Software Engineer",
      comment:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      rating: 4.8,
    },
    {
      id: 3,
      name: "Alice Johnson",
      avatar: "https://via.placeholder.com/50",
      role: "Graphic Designer",
      comment:
        "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      rating: 4.2,
    },
  ];

  return (
    <>
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Customer Reviews
          </h2>
          <div className="flex flex-row gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white shadow-md rounded-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={review.avatar}
                    alt="User Avatar"
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-600">{review.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{review.comment}</p>
                <div className="flex items-center">
                  <div className="mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a.75.75 0 0 1 .673.418l1.882 3.815 4.21.614a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L10 14.347l-3.766 1.98a.75.75 0 0 1-1.088-.791l.72-4.192L.819 7.127a.75.75 0 0 1 .416-1.28l4.21-.613L9.327 2.42A.75.75 0 0 1 10 2zm0 2.445L8.615 6.56a.75.75 0 0 1-.558.41l-3.02.44 2.184 2.132a.75.75 0 0 1 .217.664l-.515 3.004 2.694-1.416a.75.75 0 0 1 .698 0l2.693 1.416-.515-3.004a.75.75 0 0 1 .217-.664l2.184-2.132-3.02-.44a.75.75 0 0 1-.558-.41L10 4.445v.001z"
                      />
                    </svg>
                  </div>
                  <div className="text-gray-700 font-semibold">
                    {review.rating}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ReviewSection;
