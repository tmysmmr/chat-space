# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## user table

|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false, unique: true|
|mail|string|null: false|

### Associaton
- has_many :groups, through: members
- has_many :messages
- has_many :members

## group table

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|
|member|string|
|user_id|integer|null: fasle, foreign_key: true|

### Association
- has_many :users
- has_many :messages

## member table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- belongs_to :user
- has_many :messages

## message table

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|group_id|integer|null: fasle, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

### groups_users table

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: fasle, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group