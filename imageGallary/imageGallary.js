$(document).ready(function () {
  //sample images URLs
  const imageUrls = [
    "https://cdn.pixabay.com/photo/2023/09/15/11/43/yard-8254659_1280.jpg",
    "https://cdn.pixabay.com/photo/2017/11/14/13/06/kitty-2948404_1280.jpg",
    "https://cdn.pixabay.com/photo/2016/08/11/23/48/mountains-1587287_1280.jpg",
    "https://images.pexels.com/photos/442589/pexels-photo-442589.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2446711/pexels-photo-2446711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/18377810/pexels-photo-18377810/free-photo-of-colorful-cloths-on-strings.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];
  let currentImageIndex = 0;

  function showModalWithImage(index) {
    const imgSrc = imageUrls[index];
    modalImage.attr("src", imgSrc);
    modalContainer.css("display", "flex");
    currentImageIndex = index;
  }

  function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
    showModalWithImage(currentImageIndex);
  }

  function showPrevImage() {
    currentImageIndex =
      (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
    showModalWithImage(currentImageIndex);
  }
  const mainHeading = $("<h2>")
    .html("Welcome to the image gallary")
    .addClass("heading");
  const instructions = $("<p>")
    .html("Click on any picture to ZoomUp")
    .addClass("instructions");
  $("body").append(mainHeading);
  $("body").append(instructions);
  const gallaryContainer = $("<div>").addClass("gallary");
  const modalContainer = $("<div>").addClass("modal");
  const closeButton = $("<span>").addClass("close").html("&times");
  const modalImage = $("<img>")
    .addClass("modal-content")
    .attr("id", "modal-image");
  modalContainer.append(closeButton, modalImage);
  $("body").append(modalContainer);
  for (let i = 0; i < imageUrls.length; i++) {
    const thumbnail = $("<img>")
      .addClass("thumbnail")
      .attr("src", imageUrls[i]);
    gallaryContainer.append(thumbnail);
    thumbnail.click(function () {
      const imgSrc = $(this).attr("src");
      modalImage.attr("src", imgSrc);
      modalContainer.fadeIn();
      modalContainer.css("display", "flex");
      currentImageIndex = imageUrls.indexOf(imgSrc);
    });
  }
  $(document).on("click", ".close", function () {
    modalImage.attr("src", "");
    modalContainer.hide();
  });
  const nextButton = $("<span>").addClass("arrow next").html("&#8594;");
  const prevButton = $("<span>").addClass("arrow prev").html("&#8592;");
  nextButton.click(function () {
    showNextImage();
  });
  prevButton.click(function () {
    showPrevImage();
  });
  modalContainer.append(prevButton, nextButton);
  $("body").append(gallaryContainer);
});
