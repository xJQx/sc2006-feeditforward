from schemas.user import Role
from schemas.priority_request import PriorityRequestHouseCategory, PriorityRequestStatusEnum

import bcrypt

salt = bcrypt.gensalt()
common_password = bcrypt.hashpw("123123123".encode('utf-8'), salt=salt)

DATABASE_SEED_DATA = {
  # ---------- Users ---------- #
  "users": [
    # ---------- Admin ---------- #
    {
      "user_id": 1,
      "name": "Admin Jane",
      "email": "admin1@gmail.com",
      "contact_number": "98553641",
      "address": "160 Paya Lebar Road 07-08 Orion Industrial Building",
      "password": common_password,
      "profile_picture": "[Seed]profile-girl-1.jpg",
      "role": Role.ADMIM,
      "ban": False,
    },
    # ---------- Consumer ---------- #
    {
      "user_id": 2,
      "name": "Janice",
      "email": "consumer1@gmail.com",
      "contact_number": "97650024",
      "address": "2 Bukit Merah Central 21st Floor",
      "password": common_password,
      "profile_picture": "[Seed]profile-girl-2.jpg",
      "role": Role.CONSUMER,
      "ban": False,
    },
    {
      "user_id": 3,
      "name": "Alicia",
      "email": "consumer2@gmail.com",
      "contact_number": "98641998",
      "address": "HDB Tampines 214 Tampines Street 23 #06-65",
      "password": common_password,
      "profile_picture": "[Seed]profile-girl-3.jpg",
      "role": Role.CONSUMER,
      "ban": False,
    },
    {
      "user_id": 4,
      "name": "James",
      "email": "consumer3@gmail.com",
      "contact_number": "96556312",
      "address": "390 Victoria Street 01-11/12 Golden Landmark",
      "password": common_password,
      "profile_picture": "[Seed]profile-guy-3.jpg",
      "role": Role.CONSUMER,
      "ban": False,
    },
    # ---------- Hawker ---------- #
    {
      "user_id": 5,
      "name": "Alex",
      "email": "hawker1@gmail.com",
      "contact_number": "62671571",
      "address": "60 Nanyang Cres, Blk 20A #03-02, Singapore 636957",
      "password": common_password,
      "profile_picture": "[Seed]profile-hawker-ntu-hot-hideout.jpg",
      "role": Role.HAWKER,
      "ban": False,
    },
    {
      "user_id": 6,
      "name": "Adam",
      "email": "hawker2@gmail.com",
      "contact_number": "6747OOOO",
      "address": "76 Nanyang Drive, N2.1, #02-03, Nanyang Technological University, 637331",
      "password": common_password,
      "profile_picture": "[Seed]profile-hawker-ntu-north-spine.jpeg",
      "role": Role.HAWKER,
      "ban": False,
    },
    {
      "user_id": 7,
      "name": "Aaron",
      "email": "hawker3@gmail.com",
      "contact_number": "68004212",
      "address": "76 Nanyang Dr, North Spine Plaza, NS3-1-18, West Singapore, Nanyang Dr, Singapore 637331",
      "password": common_password,
      "profile_picture": "[Seed]profile-hawker-ntu-crowded-bowl.jpeg",
      "role": Role.HAWKER,
      "ban": False,
    },
    {
      "user_id": 8,
      "name": "William",
      "email": "hawker4@gmail.com",
      "contact_number": "62109721",
      "address": "50 Nanyang Ave, #01-23 North Spine, Plaza 639798",
      "password": common_password,
      "profile_picture": "[Seed]profile-hawker-chicken-rice-store.jpg",
      "role": Role.HAWKER,
      "ban": False,
    },
    {
      "user_id": 9,
      "name": "Ness",
      "email": "hawker5@gmail.com",
      "contact_number": "67920710",
      "address": "50 Nanyang Walk, Singapore 639929",
      "password": common_password,
      "profile_picture": "[Seed]profile-hawker-noodles-store.jpg",
      "role": Role.HAWKER,
      "ban": False,
    },
    # ---------- Driver ---------- #
    {
      "user_id": 10,
      "name": "Tim",
      "email": "driver1@gmail.com",
      "contact_number": "98720992",
      "address": "1003 Bt Merah Central Technopreneur Centre S159836",
      "password": common_password,
      "profile_picture": "[Seed]profile-guy-1.jpg",
      "role": Role.DRIVER,
      "ban": False,
    },
    {
      "user_id": 11,
      "name": "Thomas",
      "email": "driver2@gmail.com",
      "contact_number": "98126701",
      "address": "35 FISHERY PORT ROAD RM 407 SZip code:  619742",
      "password": common_password,
      "profile_picture": "[Seed]profile-guy-2.jpg",
      "role": Role.DRIVER,
      "ban": False,
    },
  ],
  # ---------- Admin ---------- #
  "admins": [
    {
      "admin_id": 1,
      "user_id": 1,
    }
  ],
  # ---------- Consumer ---------- #
  "consumers": [
    {
      "consumer_id": 2,
      "priority": False,
      "user_id": 2
    },
    {
      "consumer_id": 3,
      "priority": False,
      "user_id": 3
    },
    {
      "consumer_id": 4,
      "priority": False,
      "user_id": 4
    },
  ],
  # ---------- Hawker ---------- #
  "hawkers": [
    {
      "hawker_id": 5,
      "overall_rating": 4.4,
      "business_name": "A Hot Hideout (NTU)",
      "operating_hours": "9am - 5pm",
      "food_type": "Mala",
      "geometry": '{"type": "Point","latitude": 1.35397,"longitude": 103.68779}',
      "is_registered": True,
      "user_id": 5
    },
    {
      "hawker_id": 6,
      "overall_rating": 3.8,
      "business_name": "North Spine Koufu - Cai Fan Store",
      "operating_hours": "8am - 8pm",
      "food_type": "Cai Fan",
      "geometry": '{"type": "Point","latitude": 1.34713048855579,"longitude": 103.680033789538}',
      "is_registered": True,
      "user_id": 6
    },
    {
      "hawker_id": 7,
      "overall_rating": 4.4,
      "business_name": "The Crowded Bowl",
      "operating_hours": "8am - 8pm",
      "food_type": "Modern Vegetarian",
      "geometry": '{"type": "Point","latitude": 1.34703048855579,"longitude": 103.680523789538}',
      "is_registered": True,
      "user_id": 7
    },
    {
      "hawker_id": 8,
      "overall_rating": 4.8,
      "business_name": "Chicken Rice Store (NTU)",
      "operating_hours": "8am - 8pm",
      "food_type": "Chicken Rice",
      "geometry": '{"type": "Point","latitude": 1.34382260860561,"longitude": 103.682773793248}',
      "is_registered": True,
      "user_id": 8
    },
    {
      "hawker_id": 9,
      "overall_rating": 4.9,
      "business_name": "Noodles Store (NTU)",
      "operating_hours": "8am - 8pm",
      "food_type": "Noodles",
      "geometry": '{"type": "Point","latitude": 1.35019111576677,"longitude": 103.68110625844}',
      "is_registered": True,
      "user_id": 9
    },
  ],
  # ---------- Driver ---------- #
  "drivers": [
    {
      "driver_id": 10,
      "vehicle_number": "1GKLVKED8AJ155580",
      "licence_number": "C006-340-56-864-0",
      "user_id": 10
    },
    {
      "driver_id": 11,
      "vehicle_number": "2HNYD28377H522352",
      "licence_number": "C126-430-72-468-0",
      "user_id": 11
    },
  ],
  # ---------- Review ---------- #
  "reviews": [
    # ----- For A Hot Hideout (hawker_id 5) ----- #
    {
      "review_id": 1,
      "description": "Hot and spicy! It is very delicious!! 😋",
      "rating": 5.0,
      "photos": "[Seed]review-hot-hideout-1.jpg",
      "flagged": False,
      "flagged_reason": "",

      "consumer_id": 2,
      "hawker_id": 5
    },
    {
      "review_id": 2,
      "description": "Nice and cosy environment to eat mala with friends >.<",
      "rating": 5.0,
      "photos": "[Seed]review-hot-hideout-2.jpg",
      "flagged": False,
      "flagged_reason": "",

      "consumer_id": 3,
      "hawker_id": 5
    },
    {
      "review_id": 3,
      "description": "Hate it! It was too spicy and it made me sweat in front of my interviewer 😠😠",
      "rating": 0.0,
      "photos": "[Seed]review-hot-hideout-3.jpg",
      "flagged": True,
      "flagged_reason": "Unreasonable low rating",

      "consumer_id": 4,
      "hawker_id": 5
    },
    # ----- For North Spine Kofu Cai Fan (hawker_id 6) ----- #
    {
      "review_id": 4,
      "description": "Big portion. But on a more pricy side.",
      "rating": 3.8,
      "photos": "[Seed]review-ntu-north-spine-1.jpg",
      "flagged": False,
      "flagged_reason": "",

      "consumer_id": 4,
      "hawker_id": 6
    },
    # ----- For The Crowded Bowl (hawker_id 7) ----- #
    {
      "review_id": 5,
      "description": "Cheap!",
      "rating": 5.0,
      "photos": "[Seed]review-ntu-crowded-bowl-1.jpg",
      "flagged": False,
      "flagged_reason": "",

      "consumer_id": 3,
      "hawker_id": 6
    },
    # ----- For Chicken Rice Store (hawker_id 8) ----- #
    {
      "review_id": 6,
      "description": "Chicken is very tender! Highly recommended",
      "rating": 5.0,
      "photos": "[Seed]review-chicken-rice-store-1.jpg",
      "flagged": False,
      "flagged_reason": "",

      "consumer_id": 2,
      "hawker_id": 8
    },
    {
      "review_id": 7,
      "description": "🤮🤮🤮🤮",
      "rating": 1.5,
      "photos": "[Seed]review-chicken-rice-store-1.jpg",
      "flagged": True,
      "flagged_reason": "No reason given for low rating besides putting the 🤮 emoji.",

      "consumer_id": 4,
      "hawker_id": 8
    },
  ],
  # ---------- Leftover Food ---------- #
  "leftover_foods": [
    # ----- For A Hot Hideout (hawker_id 5) ----- #
    {
      "leftover_food_id": 1,
      "name": "Mala (Dry)",
      "unit_of_measurement": "Bowl",
      "amount": 3,
      "photo": "[Seed]leftoverfood-hot-hideout-1.jpg",
      "time_passed": "1 hour",
      "available": True,

      "hawker_id": 5,
    },
    {
      "leftover_food_id": 2,
      "name": "Mala (Soup)",
      "unit_of_measurement": "Bowl",
      "amount": 1,
      "photo": "[Seed]leftoverfood-hot-hideout-2.jpg",
      "time_passed": "30 mins",
      "available": True,

      "hawker_id": 5,
    },
    # ----- For North Spine Kofu Cai Fan (hawker_id 6) ----- #
    {
      "leftover_food_id": 3,
      "name": "Cai Fan (2 Meat, 1 Veg)",
      "unit_of_measurement": "Packets",
      "amount": 15,
      "photo": "[Seed]leftoverfood-ntu-north-spine-1.jpeg",
      "time_passed": "2 hours",
      "available": True,

      "hawker_id": 6,
    },
    # ----- For The Crowded Bowl (hawker_id 7) ----- #
    {
      "leftover_food_id": 4,
      "name": "Set A",
      "unit_of_measurement": "Packets",
      "amount": 5,
      "photo": "[Seed]leftoverfood-ntu-crowded-bowl-1.jpeg",
      "time_passed": "1.5 hours",
      "available": True,

      "hawker_id": 7,
    },
    # ----- For Chicken Rice Store (hawker_id 8) ----- #
    {
      "leftover_food_id": 5,
      "name": "Chicken Rice",
      "unit_of_measurement": "Packets",
      "amount": 15,
      "photo": "[Seed]leftoverfood-chicken-rice-store-1.png",
      "time_passed": "2 hours",
      "available": True,

      "hawker_id": 8,
    },
    # ----- For Noodles Store (hawker_id 9) ----- #
    {
      "leftover_food_id": 6,
      "name": "Shanghai Spring Onion Noodles",
      "unit_of_measurement": "Packets",
      "amount": 1,
      "photo": "[Seed]leftoverfood-noodles-store-1.jpeg",
      "time_passed": "2 hours",
      "available": True,

      "hawker_id": 9,
    },
  ],
  # ---------- Priority Request ---------- #
  "priority_requests": [
    {
      "priority_request_id": 1,
      
      "household_income": "$32k/year",
      "number_of_residents": 5,
      "occupation": "Admin Staff",
      "house_category": PriorityRequestHouseCategory.THREE_ROOM,
      "status": PriorityRequestStatusEnum.PENDING,
      
      "date_created": "2023-11-10 00:00:00.020909",
      "date_updated": "2023-11-10 00:00:00.020909",

      "consumer_id": 2,
    },
    {
      "priority_request_id": 2,
      
      "household_income": "$450k/year",
      "number_of_residents": 3,
      "occupation": "Software Engineer @ Google",
      "house_category": PriorityRequestHouseCategory.PENTHOUSE,
      "status": PriorityRequestStatusEnum.PENDING,
      
      "date_created": "2023-11-10 00:00:00.020909",
      "date_updated": "2023-11-10 00:00:00.020909",

      "consumer_id": 4,
    },
  ],
  # ---------- Notification ---------- #
  "notifications": [
    {
      "notification_id": 1,
      "title": "Welcome",
      "description": "Welcome to FeedItForward! You are registered as a Consumer!",
      "date_created": "2023-11-10 00:00:00.020909",

      "admin_id": 1,
      "receiver_user_id": 2,
    },
    {
      "notification_id": 2,
      "title": "Welcome",
      "description": "Welcome to FeedItForward! You are registered as a Hawker!",
      "date_created": "2023-11-10 00:00:00.020909",

      "admin_id": 1,
      "receiver_user_id": 5,
    },
    {
      "notification_id": 3,
      "title": "Review Flagged!",
      "description": "You have flagged the review 'Hate it! It was too spicy and it made me sweat in front of my interviewer 😠😠' made by James for A Hot Hideout (NTU)",
      "date_created": "2023-11-10 00:00:00.020909",

      "admin_id": 1,
      "receiver_user_id": 2,
    },
    {
      "notification_id": 4,
      "title": "[Pending] Food Priority Request",
      "description": "Your request for food priority has been submitted. Please be patience while our staff verify your details.",
      "date_created": "2023-11-10 00:00:00.020909",

      "admin_id": 1,
      "receiver_user_id": 2,
    },
    {
      "notification_id": 5,
      "title": "[Reminder] Food Priority Request To Verify",
      "description": "You have 1 food priority request to verify.",
      "date_created": "2023-11-10 00:00:00.020909",

      "admin_id": 1,
      "receiver_user_id": 1,
    },
    {
      "notification_id": 6,
      "title": "[Reminder] Flagged Review To Process",
      "description": "You have 2 flagged review to process.",
      "date_created": "2023-11-10 00:00:00.020909",

      "admin_id": 1,
      "receiver_user_id": 1,
    },
    {
      "notification_id": 7,
      "title": "[Warning] Your review has been flagged!",
      "description": "Your review 'Hate it! It was too spicy and it made me sweat in front of my interviewer 😠😠' made for A Hot Hideout (NTU) has been flagged!",
      "date_created": "2023-11-10 00:00:00.020909",

      "admin_id": 1,
      "receiver_user_id": 4,
    },
  ],
}
