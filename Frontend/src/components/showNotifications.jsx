const showNotification = (title, options) => {
  if (Notification.permission === "granted") {
    const notification=new Notification(title, options);

    notification.addEventListener('click',()=>{
        
    });

    // Handle action button clicks
    notification.addEventListener("action", (event) => {
      // Handle action button click event
      console.log(`Action button "${event.action}" clicked!`);
      // Add your custom logic here
    });
  }
};

export default showNotification;
