<?php 

namespace App\Repositories;

use App\Models\User;
class UserRepository
{
    public function getAll($role = null, $name = null)
    {
        $query = User::query();

        if ($role) {
            $query->where('role', $role);
        }
        if ($name) {
            $query->where('name', 'like', "%$name%");
        }

        return $query->paginate(6);
    }

    public function getById($id)
    {
        return User::findOrFail($id);
    }
    public function create(array $data)
    {
        return User::create($data);
    }
    public function update($id, array $data)
    {
        $user = User::findOrFail($id);
        $user->update($data);
        return $user;
    }
    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return $user;
    }
    public function changeRole($id, $role)
    {
        $user = User::findOrFail($id);
        $user->role = $role;
        $user->save();
        return $user;
    }
    public function getByEmail($email)
    {
        return User::where('email', $email)->first();
    }
    public function getByName($name)
    {
        return User::where('name', $name)->first();
    }
    public function getByEmailOrName($email, $name)
    {
        return User::where('email', $email)->orWhere('name', $name)->first();
    }
    public function getByRole($role)
    {
        return User::where('role', $role)->get();
    }
    public function getByRoleAndName($role, $name)
    {
        return User::where('role', $role)->where('name', 'like', "%$name%")->get();
    }
}